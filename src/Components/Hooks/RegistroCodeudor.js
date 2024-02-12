export const Registrocodeudor = async (data ) =>{
    try {
        const response = await fetch('http://localhost:3006/Registrocodeudor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al crear usuario. Código de estado: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        if (error.message.includes('correo ya registrado')) {
            alert('El correo ya está registrado');
        } else {
            console.error('Error al crear usuario:', error);
            throw error; // Re-lanza el error para que pueda ser manejado en el componente
        }
    }
};


app.post('/registro-codeudor', (req, res) => {
    const formData = req.body;
    const query = 'INSERT INTO tabla (campo1, campo2, campo3) VALUES (?, ?, ?)';
    connection.query(query, [formData.campo1, formData.campo2, formData.campo3], (err, results) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).json({ error: 'Error al insertar en la base de datos', details: err.message });
      } else {
        console.log('Datos insertados en la base de datos:', results);
        res.json({ message: 'Datos insertados correctamente' });
      }
    });
  });