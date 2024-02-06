import React from 'react'
import { useState, useRef } from "react";
import flecha from '../../../assets/iconSlide/flecha.png'
import { Link } from 'react-router-dom';
import '../../Slidebar/Slide.css'

const menuItems = [
  {
    name: "Bodega", // Agrega las rutas correspondientes
    items: ["Oficina", "Casa", "Apartamento", "Local"],
    to: ["/RPropietario","/RInmueble","/ReArrendatario"]
  },
];


const NavButton = ({
  onClick,
  name,
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
        <span className="name_tittle">{name}</span>
        {hasSubNav && subNavIcon && <img src={subNavIcon} alt="Sub Nav Icon" />}
      </Link>
    ) : (
      <>
        
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
        position: "absolute", 
        zIndex: 1,
        width: "15%",
        backgroundColor: "white",
        height: !isSubNavOpen(item.name, item.items)
          ? 0
          : navRef.current?.clientHeight,
      }}
      >
        <div ref={navRef} className="sub-nav-inner1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {item?.items.map((subItem) => (
              <NavButton
                key={subItem.id}
                onClick={handleClick}
                name={subItem}
                isActive={activeItem === subItem}
                to={item.to && item.to[item.items.indexOf(subItem)]}
              />
            ))}
          </div>
        </div>
      </div>
    );
};
export const RInmuebleB = () => {

  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <div className='contener-home contener-rpropietario'>
       <div className="izq RA">
       <article className='componente-form'>
          <p>Tipo Inmueble</p>
          {menuItems.map((item) => (
          <div className="input-form selecIn" key={item.name}>
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
        </article>

      <form className='form-propietario' action="">

      <article className='componente-form'>
          <p>No. Matricula</p>
          <input className='input-form' type="date" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Dirección</p>
          <input className='input-form' type="number" name="" min={1} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>ciudad</p>
          <input className='input-form' type="text" name="" id="" maxLength={100} />
        </article>

        <article className='componente-form'>
          <p>Barrio</p>
          <input className='input-form' type="number" name="" min={1000000000} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Estrato</p>
          <input className='input-form' type="email" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>No. Habitaciones</p>
          <select className='input-form' name="" id="">
            <option value="" disabled hidden selected>Seleccion el Tipo de Cuenta</option>
            <option value="Ahorro de cuenta">Ahorro de cuenta</option>
            <option value="Cuenta Corriente">Cuenta Corriente</option>
          </select>
        </article>

        <article className='componente-form'>
          <p>Tipo de Habitaciones</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>
        
        <article className='componente-form'>
          <p>Dirección del propietario</p>
          <input className='input-form' type="Text" name="" id="" />
        </article>

      </form>
      </div>
    </div>
  )
}
