// Save this as static/js/qrcode-generator.js
document.addEventListener("DOMContentLoaded", function () {
    const qrCodeElement = document.getElementById("qrcode");
    const generateButton = document.getElementById("generate");

    generateButton.addEventListener("click", function () {
        const text = document.getElementById("input-text").value;
        qrCodeElement.innerHTML = ""; // Clear previous QR code
        new QRCode(qrCodeElement, {
            text: text,
            width: 128,
            height: 128,
        });
    });
});
