import { useState, useEffect } from 'react';

const useContratoInfo = (url) => {
  const [contratoInfo, setContratoInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContratoInfo(data); // Establece los datos de los contratos directamente
      } catch (error) {
        console.error('Error fetching contratoInfo:', error);
      }
    };

    fetchData();
  }, [url]);

  return contratoInfo;
};

export default useContratoInfo;
