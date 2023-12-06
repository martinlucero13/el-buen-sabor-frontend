import { Page, Text, View, Document } from '@react-pdf/renderer';

import { formatFecha } from '../../util/PedidoUtil';
import { Pedido } from '../../types/Pedido';
import { Cliente } from '../../types/Cliente';
import styles from './StyleSheet';

interface Props {
    pedido: Pedido;
    cliente: Cliente;
}

/**
 * Componente para generar facturas.
 */
function GenerarFactura({ pedido, cliente }: Props): JSX.Element {
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>EL BUEN SABOR SA</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>CUIT: </Text>
                        <Text style={styles.textValue}>20-20221200-9</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Inicio de Actividades: </Text>
                        <Text style={styles.textValue}>1/1/2023</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Dirección: </Text>
                        <Text style={styles.textValue}>Cnle Rodriguez 247, Mendoza</Text>
                    </View>

                    <View style={styles.espacio}></View>

                    <View style={styles.titleRow}>
                        <Text style={styles.title}>DETALLES DEL PAGO</Text>
                    </View>
                    <View style={styles.horizontalLine} />

                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Nombre: </Text>
                        <Text style={styles.textValue}>{cliente?.nombre} {cliente?.apellido}</Text>
                        <Text style={styles.textLabel}>Fecha: </Text>
                        <Text style={styles.textValue}>{formatFecha(pedido.fecha)}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Pedido: #</Text>
                        <Text style={styles.textValue}>{pedido.numeroPedido}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Pago: </Text>
                        <Text style={styles.textValue}>{pedido.formaPago}</Text>
                    </View>
                    <View style={styles.columnRow}>
                        <View style={styles.column}>
                            <Text>
                                <Text style={styles.textLabel}>Subtotal: $</Text>
                                <Text style={styles.textValue}>{pedido.subtotal}</Text>
                                {"\n"}{"\n"}
                                <Text style={styles.textLabel}>Descuento: $</Text>
                                <Text style={styles.textValue}>{pedido.descuento}</Text>
                                {"\n"}{"\n"}
                                <Text style={styles.textLabel}>Total: $</Text>
                                <Text style={styles.textValue}>{pedido.total}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.titleRow}>
                        <Text style={styles.title}>ENVÍO</Text>
                    </View>
                    <View style={styles.horizontalLine} />
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Dirección: </Text>
                        <Text style={styles.textValue}>{cliente?.domicilio.calle} {cliente?.domicilio.numero} {cliente?.domicilio.localidad.nombre}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLabel}>Transportista: </Text>
                        <Text style={styles.textValue}>{pedido.formaEntrega}</Text>
                    </View>
                </Page>
            </Document >
        </>
    );
};
export default GenerarFactura;
