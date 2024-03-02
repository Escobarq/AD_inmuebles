export const userLogin = async (data) => {
  try {
    const response = await fetch('http://localhost:3006/Login_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.message === 'Inicio de sesión exitoso') {
        localStorage.setItem('items', data.correousuario); // Reinicia el formulario si la solicitud es exitosa
        window.location.href = '/Inmueble'; // Redirige al usuario a la vista de inicio
      } else {
        // Mostrar mensaje de error si el inicio de sesión no fue exitoso
        throw new Error(responseData.message);
      }
    } else {
      // Mostrar mensaje de error si hay un problema con la solicitud
      throw new Error('Hubo un problema con la solicitud');
    }
  } catch (error) {
    // Maneja los errores de red o de la aplicación
    console.error('Error al iniciar sesión:', error);
    throw error; // Relanza el error para que pueda ser manejado en el componente
  }
};
