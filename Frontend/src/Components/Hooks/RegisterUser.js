export const crearUser = async (data) => {
    try {
        const response = await fetch('http://localhost:3006/RegistrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === 400){
            throw new Error(`Correo ya registrado`);
        }

        if (!response.ok) {
            throw new Error(`Error al crear usuario. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        if (error.message.includes('Correo ya registrado')) {
            throw error;
        } else {
            console.error('Error al crear usuario:', error);
            throw error; // Re-lanza el error para que pueda ser manejado en el componente
        }
    }
};