import { useState } from 'react';

const useActualizarEstadoInmueble = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const actualizarEstadoInmueble = async (InmuebleId, nuevoEstado) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3006/VINmuebles/${InmuebleId}`, {
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

  return { actualizarEstadoInmueble, loading, error, success };
};

export default useActualizarEstadoInmueble;
