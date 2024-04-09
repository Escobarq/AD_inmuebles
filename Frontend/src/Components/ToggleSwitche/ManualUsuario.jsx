import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./Switch.css";
import { saveAs } from 'file-saver';
import pdfFile from '../Pdf/Manualndenusuario.pdf'

export const ManualUsuario = () => {

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
