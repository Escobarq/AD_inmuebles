export const userLogin = async (data) => {
    console.log(data)
    try {
      const response = await fetch('http://localhost:3006/Login_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = '/inicio'; // Redirige al usuario a la vista de inicio
      } else {
        console.error('hubo un error de nuestro lado')
      }
    } catch (error) {
      // Maneja los errores de red o de la aplicación
      console.error('Error al enviar datos al servidor:', error);
    }
  };