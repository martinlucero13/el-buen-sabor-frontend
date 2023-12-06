import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Bar } from 'react-chartjs-2';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FileExcel } from 'react-bootstrap-icons';
import { useAuth0 } from '@auth0/auth0-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { findRankingProductos } from '../../../services/RankingsService';
import { DetallePedido } from '../../../types/DetallePedido';
import { RankingProducto } from '../../../types/Estadistica';
import { estadisticaOpciones, sortData } from '../../../util/EstadisticaUtil';


/**
 *  Ranking de Productos mostrados en un gráfico.
 */
function ProductosRanking(): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rankingProductos, setRankingProductos] = useState<RankingProducto[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const [sortByDesc, setSortByDesc] = useState(false);
  const productosColumnHeaders = ['Denominación', 'Cantidad Vendida'];
  const labels = rankingProductos.map((producto) => producto.denominacion);
  const data1 = rankingProductos.map((producto) => producto.cantidadVendida);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const rankingProductosData = await findRankingProductos(startDate, endDate, token);
        const totalVendidoPorArticulo: Record<string, number> = {};

        rankingProductosData.forEach((producto) => {
          producto.detallesPedidos.forEach((detallePedido: DetallePedido) => {
            if (totalVendidoPorArticulo[producto.denominacion]) {
              totalVendidoPorArticulo[producto.denominacion] += detallePedido.cantidad;
            } else {
              totalVendidoPorArticulo[producto.denominacion] = detallePedido.cantidad;
            }
          });
        });

        const rankingProductos = rankingProductosData.map((producto) => ({
          id: producto.id,
          denominacion: producto.denominacion,
          detallesPedidos: producto.detallesPedidos,
          cantidadVendida: totalVendidoPorArticulo[producto.denominacion] || 0,
        }));

        const sortedRankingClientes = sortData(rankingProductos, sortByDesc, 'cantidadVendida');
        setRankingProductos(sortedRankingClientes);

      } catch (error) {
        console.error('Error al obtener el ranking de productos:', error);
      }
    };
    fetchData();
  }, [startDate, endDate, sortByDesc]);

  const exportProductosToExcel = (data: any[], filename: string) => {
    const filteredData = data.map((item) => [
      item.denominacion,
      item.cantidadVendida,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([productosColumnHeaders, ...filteredData]);
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

  const datasets = [
    {
      label: 'Cantidad Vendida',
      data: data1,
      backgroundColor: 'rgba(255, 158, 0, 0.8)',
      borderColor: 'rgb(255, 158, 160)',
      borderWidth: 1,
    },
  ];

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
            <Button variant="outline-success" size="sm" onClick={() => exportProductosToExcel(rankingProductos, "Ranking Productos")}>
              Exportar <FileExcel />
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button variant="link" size="lg" className="text-dark text-decoration-none"
              onClick={() => setSortByDesc(!sortByDesc)}>
              {sortByDesc ? 'Cantidad' : 'Cantidad'}{' '}
              {sortByDesc ? <span>&#8593;</span> : <span>&#8595;</span>}
            </Button>
          </Col>
        </Row>
        <Row className="py-3" style={{ minHeight: '300px' }}>
          <Col xs={12} className="px-md-0">
            <Bar options={estadisticaOpciones} data={{ labels: labels, datasets: datasets }} />
          </Col>
        </Row>
      </Container>
    </section>

  );
}
export default ProductosRanking;