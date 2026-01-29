import api from './api';

export const login = async (username, password) => {
    // Hacemos un post a la api pasandole user y password y recibiendo como respuesta el token:
    const response = await api.post('/auth/login', {username, password});
    
    // Si existe el jwt de respuesta - significa que el login es correcto
    if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Se guarda el JWT
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Se guarda el usuario
    }
    return response.data;
};

export const logout = () => {
    // Removemos el token y el usuario actual - Por ende, la app (front) siempre redirecciona al
    // login y el backend no le permite hacer consultas sin el token.
    localStorage.removeItem('token');
    localStorage.removeItem('user')
};