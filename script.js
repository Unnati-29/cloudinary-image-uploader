 const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      const formData = new FormData();
      
      const cloudName = "dvudry0jk";
      const uploadPreset = "my_unsigned_upload";

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      resultDiv.innerHTML = `
        <p><strong>Public URL:</strong> <a href="${data.secure_url}" target="_blank">${data.secure_url}</a></p>
        <img src="${data.secure_url}" alt="Uploaded Image" />
      `;
    });