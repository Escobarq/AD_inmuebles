export const Registrocodeudor = async (data) => {
    let method = 'POST'; // Asigna un valor predeterminado

    try {
        let url = 'http://localhost:3006/Rcodeudor';

        // Si hay un IdCodeudor en los datos, significa que se está editando un codeudor existente
        if (data.IdCodeudor) {
            url = `http://localhost:3006/Rcodeudor/${data.IdCodeudor}`;
            method = 'PUT'; // Actualiza el método si es una solicitud de actualización
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(data)

        if (!response.ok) {
            throw new Error(`Error al ${method === 'POST' ? 'crear' : 'actualizar'} codeudor. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        if (error.message.includes('correo ya registrado')) {
            alert('El correo ya está registrado');
        } else {
            console.error(`Error al ${method === 'POST' ? 'crear' : 'actualizar'} codeudor:`, error);
            throw error; // Re-lanza el error para que pueda ser manejado en el componente
        }
    }
};
