//use this code in your React component to connect to the backend

const formData = new FormData();
formData.append("answer_script", file1);
formData.append("key_paper", file2);

fetch("https://your-backend-url/evaluate", {
  method: "POST",
  body: formData
})
.then(res => res.json())
.then(data => console.log(data)); // Render scorecard in React
