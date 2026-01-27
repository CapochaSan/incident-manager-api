const jwt = require('jsonwebtoken');

const authenticateToken = (req,res,next) => {
    // Paso 1: Buscamos el token en el header 'Authorization'
    // Formato estándar: "Bearer <TOKEN>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.'});
    try{
        // Paso 2: Verificar el token con la clave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_provisoria');

        // Paso 3: Guardar los datos del usuario dentro del request
        req.user = verified;

        // Paso 4: concedemos el permiso para seguir al controlador
        next();
    }catch (error){
        res.status(403).json({ error: 'Token inválido o expirado.'});
    }
};

module.exports = authenticateToken;