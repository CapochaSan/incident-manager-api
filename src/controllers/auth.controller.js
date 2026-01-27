const {User} = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar un nuevo usuario (user: Técnico)
exports.register = async (req, res) => {
    try{
        const {username, password, role} = req.body;
        const user =  await User.create({username, password, role});
        res.status(201).json({ message: 'Usuario creado con éxito', userId: user.id});   
    } catch (error){
        res.status(400).json({ message: error.message });
    }
};

// Login y generación del TOKEN
exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({ where: {username} });

        if (!user)  return res.status(404).json({ error: "Usuario no encontrado"});

        // Comparamos la clave ingresada con el hash de la DB
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

        // Si coincide lo anterior, se genera el JWT
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET || 'clave_secreta_provisoria',
            { expiresIn: '8h'} // TOKEN con duración de una jornada laboral de 8h
        );
        
        res.json({token});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};