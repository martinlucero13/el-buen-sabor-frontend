import "./Page401.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { EmojiAngryFill } from "react-bootstrap-icons";


function Page401(): JSX.Element {
    return (
        <section className="py-3">
            <h1 className="text-center">
                Vaya
            </h1>
            
            <p className="zoom-area">
                No tienes permiso para acceder a esta página.
            </p>
            
            <p className="text-center">
                <EmojiAngryFill size={30} />
            </p>

            <div className="error-container">
                <span>
                    <span>4</span>
                </span>
                <span>
                    0
                </span>
                <span>
                    <span>1</span>
                </span>
            </div>
            
            <div className="text-center">
                <Link to="/" className="d-inline-block">
                    <Button variant="light">
                        Inicio
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default Page401;