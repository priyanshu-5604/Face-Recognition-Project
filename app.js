const video = document.getElementById("camera-stream");
const captureButton = document.getElementById("capture-image");
const detectedImage = document.getElementById("detected-image");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
    captureButton.addEventListener("click", function () {
      detectedImage.src = video.srcObject;
      detectedImage.style.display = "block";
    });
  });