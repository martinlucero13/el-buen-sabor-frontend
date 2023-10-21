import { Container } from "react-bootstrap";


function MapPage(): JSX.Element {
    return (
        <section>
            <Container className="py-3 text-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0441981739364!2d-68.855938424649!3d-32.896999669382296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0908d5e865c5%3A0xb5ec70786453a73!2sUTN%20Facultad%20Regional%20Mendoza!5e0!3m2!1ses-419!2sar!4v1691513487527!5m2!1ses-419!2sar"
                    width="600"
                    height="450"
                    loading="lazy"
                />
            </Container>
        </section>
    );
}

export default MapPage;