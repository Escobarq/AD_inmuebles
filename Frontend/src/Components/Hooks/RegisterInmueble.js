export const crearInmueble = async (data) => {
    data.Estado = "Disponible"
    try {
        const response = await fetch('http://localhost:3006/Reinmueble', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 400){
            throw new Error(`Numero de Matricula duplicado`);
        }

        if (!response.ok) {
            throw new Error(`Error al crear usuario. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        if (error.message.includes('Numero de Matricula duplicado')) {
            console.log('Numero de Matricula duplicado')
            throw error;
        } else {
            console.error('Error en el registro del inmueble', error);
            throw error; // Re-lanza el error para que pueda ser manejado en el componente
        }
    }
};