import { useState } from 'react';

const useActualizarEstadoCodeudor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const actualizarEstadoCodeudor = async (codeudorId, nuevoEstado) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3006/Vcodeudor/${codeudorId}`, {
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

  return { actualizarEstadoCodeudor, loading, error, success };
};

export default useActualizarEstadoCodeudor;
