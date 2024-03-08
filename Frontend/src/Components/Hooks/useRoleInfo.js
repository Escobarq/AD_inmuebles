import { useEffect, useState } from 'react';

const useRoleInfo = () => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3006/Infouser?correousuario=' + localStorage.getItem("items"));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRoleId(data[0].Idrol);
      } catch (error) {
        console.error("Error fetching role ID:", error);
      }
    };

    fetchData();
  }, []);

  return roleId;
};

export default useRoleInfo;
