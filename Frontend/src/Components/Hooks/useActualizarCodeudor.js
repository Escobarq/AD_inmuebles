// En un nuevo archivo, por ejemplo, useActualizarCodeudor.js

import { useState } from 'react';

const useActualizarCodeudor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actualizarCodeudor = async (id, newData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3006/Vcodeudor/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información del codeudor');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { actualizarCodeudor, loading, error };
};

export default useActualizarCodeudor;
