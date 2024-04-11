const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Crear el directorio uploads si no existe
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de Multer para almacenar archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Ruta POST para manejar la carga de la imagen de perfil
app.post('/upload', upload.single('profilePic'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se encontró el archivo para subir.');
    }
    res.send(`Imagen cargada con éxito: <img src="/${req.file.path}" alt="Uploaded Image">`);
});

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));