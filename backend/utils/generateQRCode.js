const QRCode = require("qrcode");

const generateQRCode = async (qrData) => {
  try {
    // Convert data object to JSON string
    const dataString = JSON.stringify(qrData);
    
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(dataString, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.95,
      margin: 1,
      width: 300,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    throw new Error("Failed to generate QR code");
  }
};

module.exports = {
  generateQRCode,
};
