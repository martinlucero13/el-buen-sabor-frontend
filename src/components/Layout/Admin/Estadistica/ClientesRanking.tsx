import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FileExcel } from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { findRankingClientes } from '../../../../services/RankingsService';
import { Pedido } from '../../../../types/Pedido';
import { RankingCliente } from '../../../../types/Estadistica';
import { estadisticaOpciones, sortData } from '../../../../util/EstadisticaUtil';


function ClientesRanking(): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rankingClientes, setRankingClientes] = useState<RankingCliente[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const [sortByDesc, setSortByDesc] = useState(false);
  const labels = rankingClientes.map((cliente) => cliente.nombre);
  const dataCantidadTotal = rankingClientes.map((cliente) => cliente.cantidadPedidos);
  const dataMontoTotal = rankingClientes.map((cliente) => cliente.montoTotal);
  const columnHeaders = ['Nombre', 'Cantidad de Pedidos', 'Monto Total'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const rankingClientesData = await findRankingClientes(startDate, endDate, token);
        const rankingClientes = rankingClientesData.map((cliente) => {
          const cantidadPedidos = cliente.pedidos
            .filter((pedido: Pedido) => pedido.estado === 'COMPLETADO')
            .length;

          const montoTotal = cliente.pedidos
            .filter((pedido: Pedido) => pedido.estado === 'COMPLETADO')
            .reduce(
              (total: number, pedido: Pedido) => total + pedido.total,
              0
            );

          return {
            id: cliente.id,
            nombre: cliente.nombre,
            detallesPedidos: cliente.detallesPedidos,
            montoTotal,
            cantidadPedidos,
            pedidos: cliente.pedidos,
          };
        });

        const sortedRankingClientes = sortData(rankingClientes, sortByDesc, 'montoTotal');
        setRankingClientes(sortedRankingClientes);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [startDate, endDate, sortByDesc]);
  
  const exportToExcel = (data: any[], filename: string, columnHeaders: string[]) => {
    const filteredData = data.map((item) =>
      columnHeaders.map((header) => {
        if (header === 'Nombre') {
          return item.nombre;
        } else if (header === 'Cantidad de Pedidos') {
          return item.cantidadPedidos;
        } else if (header === 'Monto Total') {
          return item.montoTotal;
        }
        return '';
      })
    );

    const ws = XLSX.utils.aoa_to_sheet([columnHeaders, ...filteredData]);
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

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Cantidad de Pedidos',
        data: dataCantidadTotal,
        backgroundColor: 'rgba(255,158,0,0.8)',
        borderColor: 'rgba(255,158,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Monto Total',
        data: dataMontoTotal,
        backgroundColor: 'rgba(52,58,64,0.8)',
        borderColor: 'rgba(52,58,70,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <Container className="py-3">
        <Row>
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
            <Button variant="outline-success" size="sm" onClick={() => exportToExcel(rankingClientes, "Ranking Clientes", columnHeaders)}>
              Exportar <FileExcel />
            </Button>
          </Col>
        </Row>

        <Row className="py-3">
          <Col xs={12} md={6}>
            <Button variant="link" size="lg" className="text-dark text-decoration-none"
              onClick={() => setSortByDesc(!sortByDesc)}>
              {sortByDesc ? 'Cantidad' : 'Cantidad'}{' '}
              {sortByDesc ? <span>&#8593;</span> : <span>&#8595;</span>}
            </Button>
            <Row>
              <Bar data={chartData} options={estadisticaOpciones} />
            </Row>
          </Col>

          <Col xs={12} md={2}>
          </Col>

          <Col xs={12} md={2}>
            <h3><strong>Clientes</strong></h3>
            <Table responsive bordered hover>
              <thead className="table-thead">
                <tr>
                  <th>Nombre</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {rankingClientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td><Link to={`/mis-pedidos/${cliente.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      Ver pedidos
                    </Link></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default ClientesRanking;