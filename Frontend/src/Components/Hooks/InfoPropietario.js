export const InfoPropietario = async (filtroData) => {
    try {
        const queryParams = new URLSearchParams(filtroData);
        const response = await fetch(
          `http://localhost:3006/Vpropietarios?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
  
        const PropetarioActivos = data.filter(
          (Propetarios) => Propetarios.booleanos === "true"
        );
        return(PropetarioActivos)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  };