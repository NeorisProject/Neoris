const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const sql = require('mssql');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // You can use 'localhost\\instance' to connect to named instance
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    enableArithAbort: true
  }
};

// Conectar a la base de datos
sql.connect(config).then(pool => {
  if(pool.connecting) {
    console.log('Connecting to the SQL Server...');
  }

  if(pool.connected) {
    console.log('Connected to SQL Server successfully!');
  }

  return pool;
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});

// Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded

app.post('/register', async (req, res) => {
  const { name, email, password, linkedin, fechaNac, empresa } = req.body;

  try {
      const pool = await sql.connect(config);
      // Primero verificar si el email ya existe
      const emailCheckResult = await pool.request()
          .input('email', sql.VarChar, email)
          .query('SELECT * FROM Users WHERE Email = @email');
      
      if (emailCheckResult.recordset.length > 0) {
          // Si el correo ya existe, enviar un mensaje de error
          return res.status(400).json({ status: 'error', message: 'El correo electrónico ya está en uso.' });
      }
      
      // Hashear la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 8);
      
      // Si el correo no existe, proceder con la inserción
      const result = await pool.request()
          .input('name', sql.VarChar, name)
          .input('email', sql.VarChar, email)
          .input('password', sql.VarChar, hashedPassword) // Guardar la contraseña hasheada
          .input('linkedin', sql.VarChar, linkedin)
          .input('fechaNac', sql.Date, fechaNac)
          .input('empresa', sql.VarChar, empresa)
          .query('INSERT INTO Users (Name, Email, Password, LinkedIn, FechaNac, Empresa) VALUES (@name, @email, @password, @linkedin, @fechaNac, @empresa)');
      
      res.json({ status: 'success', message: 'Registro completado con éxito' });
  } catch (err) {
      console.error('SQL error', err);
      res.status(500).json({ status: 'error', message: 'Error al registrar el usuario.' });
  }
});
  
// Ruta POST para el inicio de sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const pool = await sql.connect(config);
        
        // Verifica si el correo electrónico está registrado
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Aquí deberías comparar la contraseña hasheada, por ejemplo con bcrypt
            const isMatch = await bcrypt.compare(password, user.Password);
            
            if (isMatch) {
                // Las credenciales son correctas
                return res.json({ status: 'success', message: 'Inicio de sesión exitoso.' });
                // Aquí podrías generar un token de sesión si implementas autenticación con tokens
            } else {
                // La contraseña no coincide
                return res.status(401).json({ status: 'error', message: 'Credenciales inválidas.' });
            }
        } else {
            // No se encontró el usuario
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado.' });
        }
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).json({ status: 'error', message: 'Error al procesar la solicitud.' });
    }
});



// Levantar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

