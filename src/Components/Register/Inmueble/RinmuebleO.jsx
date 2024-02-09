import React from 'react'
import { useState, useRef } from "react";
import flecha1 from '../../../assets/iconSlide/flecha1.png'
import { Link } from 'react-router-dom';
import './RInmuebleB.css'
import save from '../../../assets/save.png'
import cancel from '../../../assets/cancel.png'

const menuItems = [
  {
    name: "Oficina", // Agrega las rutas correspondientes
    items: ["Bodega", "Casa", "Apartamento", "Local"],
    to: ["/RInmuebleB","/RInmuebleC","/RInmuebleA", "/RInmuebleL"]
  },
];
const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

const NavButton = ({
  onClick,
  name,
  isActive,
  hasSubNav,
  subNavIcon,
  to, // Agrega la propiedad to para las rutas
}) => (
  
  <button 
    id='selectInmue'
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {to ? (
      <Link to={to}>
        <span className="name_tittle">{name}</span>
        {tab}
        {hasSubNav && subNavIcon && <img src={subNavIcon} alt="Sub Nav Icon" className="flecha1"/>}
      </Link>
    ) : (
      <>
        
        <span className="name_tittle">{name}</span>
        {tab}
        {hasSubNav && subNavIcon && <img src={subNavIcon} alt="Sub Nav Icon" className="flecha1"/>}
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
export const RInmuebleO = () => {

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
                  subNavIcon={flecha1}
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
          <input className='input-form' type="number" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>Dirección</p>
          <input className='input-form' type="text" name="" min={1} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>ciudad</p>
          <input className='input-form' type="text" name="" id="" maxLength={100} />
        </article>

        <article className='componente-form'>
          <p>Barrio</p>
          <input className='input-form' type="text" name="" min={1000000000} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>Estrato</p>
          <input className='input-form' type="number" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>No. Baños</p>
          <input type="number" className='input-form' name="" id="" />
        </article>

      </form>
      </div>
      <div className="der RA">
        <form className='form-porpietario' action="">

      <article className='componente-form'>
          <p>Servicios Publicos</p>
          <input className='input-form' type="text" name="" id="" />
        </article>

        <article className='componente-form'>
          <p>aseguramiento</p>
          <input className='input-form' type="text" name="" min={1} max={9999999999} id="" />
        </article>

        <article className='componente-form'>
          <p>No. Identidad Propietario</p>
          <input className='input-form' type="number" name="" id="" maxLength={100} />
        </article>

        </form>
        <article className="save_deleter">
          <button type="button">
        <img src={save} alt="" />
        <p className="text_button">Guardar</p>
          </button>

        <button type="button">
        <img src={cancel} alt="" />
        <p className="text_button">Cancelar</p>
        </button>

        </article> 
      </div>
    </div>
  )
}

