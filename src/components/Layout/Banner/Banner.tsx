import { Image } from "react-bootstrap";

/**
 * Componente que muestra el encabezado de la sección de inicio (Home).
 */
function Banner(): JSX.Element {
    return (
        <Image 
            src="/images/banner.jpg"
            alt="banner"
            fluid 
            loading="lazy"
            className="d-block w-100"
        />
    );
}

export default Banner;