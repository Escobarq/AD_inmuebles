import { useState } from "react";
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  OverlayTrigger,
  Tooltip,
  Card,
  Row,
  Col,
  ModalFooter,
} from "react-bootstrap";
import "./Switch.css";
import { saveAs } from 'file-saver';
import pdfFile from '../Pdf/Manualndenusuario.pdf'

export const ManualUsuario = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSwitchChange = () => {
    window.open("https://drive.google.com/file/d/1R7c0QW3C_zAjqYJ-vpr7Dm7Q7we_1shp/view?usp=sharing", "_blank");
  };
  const handleDownloadPDF = () => {
    saveAs(pdfFile, 'Manual_Usuario.pdf'); // Guardar el archivo PDF con un nombre específico
  }

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-top">Manual Usuario</Tooltip>}
      >  
        <FontAwesomeIcon className="iconManual" onClick={handleDownloadPDF}icon={faBookBookmark} />
      </OverlayTrigger>

        </>
  );
};
