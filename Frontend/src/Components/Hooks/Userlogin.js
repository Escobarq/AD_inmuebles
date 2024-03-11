export const userLogin = async (data) => {
  try {
    const response = await fetch('http://localhost:3006/api/Login_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('items', data.correousuario); // Reinicia el formulario si la solicitud es exitosa
      window.location.href = '/Inmueble'; 
      return responseData; // Devuelve los datos de respuesta si la solicitud es exitosa
    } else if (response.status === 401) {
      throw new Error('Contraseña incorrecta'); // Lanza un error si la contraseña es incorrecta
    } else if (response.status === 404) {
      throw new Error('Usuario no encontrado o no autorizado para iniciar sesión'); // Lanza un error si el usuario no está autorizado
    } else {
      throw new Error('Error en la solicitud'); // Lanza un error si hay un problema con la solicitud
    }
  } catch (error) {
    // Maneja los errores de red o de la aplicación
    console.error('Error al iniciar sesión:', error);
    throw error; // Relanza el error para que pueda ser manejado en el componente
  }
};
