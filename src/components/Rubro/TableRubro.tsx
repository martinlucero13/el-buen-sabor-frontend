import "./Rubro.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import ItemRubro from "./ItemRubro";
import ModalRubro from "./ModalRubro";

import { Rubro } from "../../types/Rubro";
import { useModal } from "../../hooks/useModal";
import { findAllRubro, findRubroById } from "../../services/RubroService";

function TableRubro(): JSX.Element {
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllRubros();
    }, []);

    const getAllRubros = async () => {
        const token = await getAccessTokenSilently();
        const newRubros = await findAllRubro(token);

        for (const item of newRubros) {
            if (item.rubroPadreId) {
                const rubroPadre = await getRubroPadreById(item.rubroPadreId);
                item.rubroPadre = rubroPadre;
            }
        }

        setRubros(newRubros);
    };

    const getRubroPadreById = async (id: number) => {
        const token = await getAccessTokenSilently();
        const newRubro = await findRubroById(id, token);

        return newRubro;
    };

    return (
        <>
            <Container className="container-header">
                <h1>Rubro</h1>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
            </Container>

            <Container>
                <Table responsive bordered hover>
                    <thead className="thead-rubro">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro Padre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rubros?.map((item: Rubro, index: number) =>
                                <ItemRubro key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalRubro
                showModal={showModal}
                handleClose={handleClose}
            />

        </>
    );
}

export default TableRubro;