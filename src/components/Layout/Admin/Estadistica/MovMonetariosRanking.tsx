import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DatePicker from 'react-datepicker';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FileExcel } from 'react-bootstrap-icons';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { findMovimientosMonetarios } from '../../../../services/RankingsService';
import { RankingMonetarios } from '../../../../types/Estadistica';
import { estadisticaOpciones } from '../../../../util/EstadisticaUtil';


function MovMonetariosRanking(): JSX.Element {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { getAccessTokenSilently } = useAuth0();
    const [movimientos, setMovimientos] = useState<RankingMonetarios | null>(null);
    const movMonetariosColumnHeaders = ['Ingresos Totales', 'Costos Totales', 'Ganancias Totales'];
    const dataToExport = [
        {
            ingresosTotales: movimientos?.ingresosTotales,
            costosTotales: movimientos?.costosTotales,
            gananciasTotales: movimientos?.gananciasTotales,
        }
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await findMovimientosMonetarios(startDate, endDate, token);
                setMovimientos(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const exportMovMonetariosToExcel = (data: any[], filename: string) => {
        const filteredData = data.map((item) => [
            item.ingresosTotales,
            item.costosTotales,
            item.gananciasTotales,
        ]);

        const ws = XLSX.utils.aoa_to_sheet([movMonetariosColumnHeaders, ...filteredData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
        });

        const excelBlob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        saveAs(excelBlob, filename);
    };


    const data = {
        labels: ['Ingresos', 'Costos', 'Ganancias'],
        datasets: [
            {
                label: 'Datos monetarios',
                data: [
                    movimientos?.ingresosTotales || 0,
                    movimientos?.costosTotales || 0,
                    movimientos?.gananciasTotales || 0,
                ],
                backgroundColor: [
                    'rgba(52, 58, 64, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgb(52, 58, 120)',
                    'rgb(255, 99, 140, 0.8)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <section>
            <Container className="py-3">
                <Row className="py-3">
                    <Col xs={12} md={4}>
                        <div><strong>Fecha Desde</strong></div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date as Date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Col>
                    <Col xs={12} md="auto">
                        <div><strong>Fecha Hasta</strong></div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date as Date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Col>
                    <Col className="mt-4">
                        <Button variant="outline-success" size="sm" onClick={() => exportMovMonetariosToExcel(dataToExport, "Ranking Movimientos Monetarios")}>
                            Exportar <FileExcel />
                        </Button>
                    </Col>
                </Row>
                <Row className="py-3" style={{ minHeight: '300px' }}>
                    <Col xs={12} className="px-md-0">
                        <Bar options={estadisticaOpciones} data={data} />
                    </Col>
                </Row>

            </Container>
        </section>
    );
}

export default MovMonetariosRanking;