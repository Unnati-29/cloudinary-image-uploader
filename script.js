const fileInput = document.getElementById("fileUpload");
const uploadBtn = document.getElementById("uploadBtn");
const resultDiv = document.getElementById("result");

uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    resultDiv.innerHTML = "<p>Please select a file first.</p>";
    return;
  }

  const formData = new FormData();
  const cloudName = "dvudry0jk";
  const uploadPreset = "my_unsigned_upload";

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    resultDiv.innerHTML = `
      <p><strong>Public URL:</strong> <a href="${data.secure_url}" target="_blank">${data.secure_url}</a></p>
      <img src="${data.secure_url}" alt="Uploaded Image" />
    `;
  } catch (err) {
    resultDiv.innerHTML = "<p>Upload failed. Try again.</p>";
    console.error(err);
  }
});
