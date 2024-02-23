import { useState } from 'react';

const useActualizarEstadoHistorialGasto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const actualizarEstadoHgastos = async (HgastosID, nuevoEstado) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3006/Vhgastos/${HgastosID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del codeudor');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { actualizarEstadoHgastos, loading, error, success };
};

export default useActualizarEstadoHistorialGasto;
