import { useState, useRef } from "react";
import flecha1 from "../../../assets/iconSlide/flecha1.png";
import { Link } from "react-router-dom";
import "./RInmuebleB.css";
import save from "../../../assets/save.png";
import cancel from "../../../assets/cancel.png";
import { useForm } from "react-hook-form";
import { crearInmueble } from "../../Hooks/RegisterInmueble";

const menuItems = [
  {
    name: "Bodega", // Agrega las rutas correspondientes
    items: ["Oficina", "Casa", "Apartamento", "Local"],
    to: ["/RInmuebleO", "/RInmuebleC", "/RInmuebleA", "/RInmuebleL"],
  },
];
const tab = (
  <>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </>
);

const NavButton = ({
  onClick,
  name,
  isActive,
  hasSubNav,
  subNavIcon,
  to, // Agrega la propiedad to para las rutas
}) => (
  <button
    id="selectInmue"
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {to ? (
      <Link to={to}>
        <span className="name_tittle">{name}</span>
        {tab}
        {hasSubNav && subNavIcon && (
          <img src={subNavIcon} alt="Sub Nav Icon" className="flecha1" />
        )}
      </Link>
    ) : (
      <>
        <span className="name_tittle">{name}</span>
        {tab}
        {hasSubNav && subNavIcon && (
          <img src={subNavIcon} alt="Sub Nav Icon" className="flecha1" />
        )}
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

export const RInmuebleB = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  //La siguiente funcion realizara el registro del inmueble
  const onsubmitRegistro = async (data) => {
    data.Tipo = "Bodega";
    try {
      await crearInmueble(data);
    } catch (error) {
      if (error.message.includes("correo ya registrado")) {
        alert("El correo ya está registrado");
      } else {
        console.error("Error al crear usuario:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el componente
      }
    }
  };

  return (
    <div className="contener-home contener-rpropietario">
      <form
        id="Bodega-form"
        onSubmit={handleSubmit(onsubmitRegistro)}
        method="post"
        encType="multipart/form-data"
        className="form-inmueble"
        action=""
      >
        <div className="izq RA">
          <article className="componente-form">
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

          <article className="componente-form">
            <p>No. Matricula</p>
            <input
              {...register("Nmatricula")}
              placeholder="Nmatricula"
              className="input-form"
              type="number"
              name="Nmatricula"
              id=""
            />
          </article>

          <article className="componente-form">
            <p>Dirección</p>
            <input
              {...register("Direccion")}
              className="input-form"
              type="text"
            />
          </article>

          <article className="componente-form">
            <p>ciudad</p>
            <input {...register("Ciudad")} className="input-form" type="text" />
          </article>

          <article className="componente-form">
            <p>Barrio</p>
            <input {...register("Barrio")} className="input-form" type="text" />
          </article>

          <article className="componente-form">
            <p>Estrato</p>
            <input
              {...register("Estrato")}
              className="input-form"
              type="number"
            />
          </article>

          <article className="componente-form">
            <p>No. Baños</p>
            <input
              {...register("Nbanos")}
              className="input-form"
              type="number"
            />
          </article>
        </div>
        <div className="der RA">
          <article className="componente-form">
            <p>Servicios Publicos</p>
            <input
              {...register("Spublicos")}
              className="input-form"
              type="text"
            />
          </article>

          <article className="componente-form">
            <p>aseguramiento</p>
            <input
              {...register("aseguramiento")}
              className="input-form"
              type="date"
            />
          </article>

          <article className="componente-form">
            <p>No. Identidad Propietario</p>
            <input
              {...register("Nidentificacionp")}
              className="input-form"
              type="number"
            />
          </article>

          <article className="save_deleter">
            <button type="submit">
              <img src={save} alt="" />
              <p className="text_button">Guardar</p>
            </button>

            <button type="reset">
              <img src={cancel} alt="" />
              <p className="text_button">Cancelar</p>
            </button>
          </article>
        </div>
      </form>
    </div>
  );
};
