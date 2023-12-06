import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    horizontalLine: {
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderBottomStyle: 'solid',
        marginBottom: 10,
    },
    textRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    textLabel: {
        fontWeight: 'bold',
    },
    textValue: {
        flex: 1,
    },
    columnRow: {
        flexDirection: 'row',
        borderColor: 'white',
        flex: 1,
    },
    column: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: 'black',
        borderRightStyle: 'solid',
        padding: 5,
        borderColor: 'white',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    espacio: {
        marginTop: 20,
        marginBottom: 20
    }

});

export default styles;
