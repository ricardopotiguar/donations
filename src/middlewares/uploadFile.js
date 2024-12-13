import multer from 'multer';


/* const path = require("path"); */

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/userNeedsImages/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const uploadFile = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 }}) // Limite de 1MB });

export {uploadFile }
