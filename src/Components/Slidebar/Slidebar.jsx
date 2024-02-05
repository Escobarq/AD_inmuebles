import React from "react";
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom
import home from '../../assets/iconSlide/home.png'
import informe from '../../assets/iconSlide/informe.png'
import recibo from '../../assets/iconSlide/recibo.png'
import registro from '../../assets/iconSlide/registro.png'
import flecha from '../../assets/iconSlide/flecha.png'
import ver from '../../assets/iconSlide/ver.png'
import { useState, useRef } from "react";
import "./Slide.css";

const menuItems = [
  {
    icon: <img className="icon-side" src={home} alt="" />,
    name: "Inicio",
    to: "/"
  },
  {
    icon: <img className="icon-side" src={registro} alt="" />,
    name: "Registro", // Agrega las rutas correspondientes
    items: ["Propietario", "Inmueble", "Arrendatario"],
    to: ["/RPropietario"]
  },
  {
    icon: <img className="icon-side" src={recibo} alt="" />,
    name: "Recibo",
    items: ["Recibo Arrendatario", "Recibo Gastos"],
  },
  {
    icon: <img className="icon-side" src={ver} alt="" />,
    name: "ver",
    items: ["Propietarios", "Inmuebles", "Arrendatarios", "Codeudor", "Historias Recibos", "Historial Gastos"],
    to: ["/Propietario", "/Inmueble", "/Arrendatario","/Codeudor","/H_recibos","/H_gastos"],
  },
  {
    icon: <img className="icon-side" src={informe} alt="" />,
    name: "Informes",
    items: ["Contrato Arrendatario", "Gastos inmueble"],
  },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const NavButton = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
  subNavIcon,
  to, // Agrega la propiedad to para las rutas
}) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {to ? (
      <Link to={to}>
        {icon && <Icon icon={icon} />}
        <span className="name_tittle">{name}</span>
        {hasSubNav && subNavIcon && <img src={subNavIcon} alt="Sub Nav Icon" />}
      </Link>
    ) : (
      <>
        {icon && <Icon icon={icon} />}
        <span className="name_tittle">{name}</span>
        {hasSubNav && subNavIcon && <img src={subNavIcon} alt="Sub Nav Icon" />}
      </>
    )}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items.some((i) => i === activeItem) || item === activeItem;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
            to={item.to && item.to[item.items.indexOf(subItem)]} // Añade la ruta correspondiente si existe
          />
        ))}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <div className="info-side">
        {menuItems.map((item) => (
          <div className="elemento" key={item.name}>
            {!item.items && (
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
                to={item.to}
              />
            )}
            {item.items && (
              <>
                <NavButton
                  onClick={handleClick}
                  name={item.name}
                  icon={item.icon}
                  isActive={activeItem === item.name}
                  hasSubNav={!!item.items}
                  subNavIcon={flecha}
                  to={item.to}
                />
                <SubMenu
                  activeItem={activeItem}
                  handleClick={handleClick}
                  item={item}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
