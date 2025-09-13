from flask import Flask, request, jsonify
from google.cloud import vision
from google.oauth2 import service_account
from docx import Document
import re
from sentence_transformers import SentenceTransformer, util
import torch
import os
import json

app = Flask(__name__)

# -----------------------------
# Google Vision API credentials
# -----------------------------
# Option 1: Using JSON file (place credentials.json in the backend folder)
credentials = service_account.Credentials.from_service_account_file("credentials.json")
client = vision.ImageAnnotatorClient(credentials=credentials)

# -----------------------------
# Load Sentence Transformer model (CPU)
# -----------------------------
model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')

# -----------------------------
# OCR function
# -----------------------------
def detect_text(file):
    content = file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if response.error.message:
        raise Exception(f'{response.error.message}')

    return texts[0].description if texts else ""

# -----------------------------
# Clean OCR text
# -----------------------------
def clean_text(raw_text):
    text = re.sub(r'\s+', ' ', raw_text)
    return text.strip()

# -----------------------------
# Extract key paper answers
# -----------------------------
def extract_key_answers(docx_file):
    doc = Document(docx_file)
    full_text = "\n".join([para.text for para in doc.paragraphs])
    key_answers = {}
    matches = re.findall(r"(Q\d+)\.\s*(.*?)\n", full_text + "\n")
    for q, answer in matches:
        key_answers[q] = {"answer": answer.strip(), "marks": 5}  # customize marks if needed
    return key_answers

# -----------------------------
# Evaluation logic
# -----------------------------
def evaluate(student_text, key_answers):
    results = {}
    student_sentences = re.split(r'[.?!]\s*', student_text)

    for q, key in key_answers.items():
        key_embedding = model.encode(key["answer"], convert_to_tensor=True)
        best_similarity = 0
        best_snippet = ""

        for sentence in student_sentences:
            sentence_embedding = model.encode(sentence, convert_to_tensor=True)
            similarity = util.cos_sim(key_embedding, sentence_embedding).item()
            if similarity > best_similarity:
                best_similarity = similarity
                best_snippet = sentence.strip()

        if best_similarity >= 0.85:
            marks_obtained = key["marks"]
        elif best_similarity >= 0.6:
            marks_obtained = round(key["marks"] * 0.6)
        else:
            marks_obtained = 0

        results[q] = {
            "key_answer": key["answer"],
            "student_answer": best_snippet,
            "similarity": round(best_similarity, 2),
            "marks_obtained": marks_obtained,
            "max_marks": key["marks"]
        }

    return results

# -----------------------------
# API endpoint
# -----------------------------
@app.route("/evaluate", methods=["POST"])
def evaluate_exam():
    if "answer_script" not in request.files or "key_paper" not in request.files:
        return jsonify({"error": "Files not provided"}), 400

    answer_script = request.files["answer_script"]
    key_paper = request.files["key_paper"]

    # OCR
    raw_text = detect_text(answer_script)
    student_text = clean_text(raw_text)

    # Key paper parsing
    key_answers = extract_key_answers(key_paper)

    # Evaluation
    results = evaluate(student_text, key_answers)
    total_marks = sum(r["marks_obtained"] for r in results.values())
    max_total = sum(r["max_marks"] for r in results.values())

    return jsonify({
        "results": results,
        "total_marks": total_marks,
        "max_total": max_total
    })

# -----------------------------
# Run backend
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
