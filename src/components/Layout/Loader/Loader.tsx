import "./Loader.css";
import { Spinner } from "react-bootstrap";

interface Props {
    message?: string;
}

/**
 * Componente que representa un spinner de carga con un mensaje opcional.
 */
function Loader({ message }: Props): JSX.Element {
    return (
        <div className="container-spinner">
            <Spinner animation="border" className="custom-spinner" />
            { message && <span className="message-spinner">{message}</span> }
        </div>
    );
}

export default Loader;