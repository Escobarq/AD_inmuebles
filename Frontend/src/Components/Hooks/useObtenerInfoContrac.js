import { useState, useEffect } from 'react';

const useContratoInfo = (url) => {
  const [contratoInfo, setContratoInfo] = useState([]);
  const [contratoAseguramientoInfo, setContratoAseguramientoInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContratoInfo(data);

        // Filtrar contratos por fecha de aseguramiento
        const currentDate = new Date();
        const fourMonthsLater = new Date(currentDate.getTime() + 4 * 30 * 24 * 60 * 60 * 1000); // Fecha actual más 4 meses en milisegundos

        const contratoAseguramientoInfo = data.filter((contrato) => {
          const fechaAseguramiento = new Date(contrato.VAseguramiento);
          return fechaAseguramiento.getTime() <= fourMonthsLater.getTime();
        });

        setContratoAseguramientoInfo(contratoAseguramientoInfo);
      } catch (error) {
        console.error('Error fetching contratoInfo:', error);
      }
    };

    fetchData();
  }, [url]);

  return { contratoInfo, contratoAseguramientoInfo };
};

export default useContratoInfo;