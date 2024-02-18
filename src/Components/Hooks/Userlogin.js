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
        localStorage.setItem('items',(data.correousuario)); // Reinicia el formulario si la solicitud es exitosa
        window.location.href = '/Inmueble'; // Redirige al usuario a la vista de inicio
      } else {
        console.error('hubo un error de nuestro lado')
      }
    } catch (error) {
      // Maneja los errores de red o de la aplicación
      console.error('Error al enviar datos al servidor:', error);
    }
  };