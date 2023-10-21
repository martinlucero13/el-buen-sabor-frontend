interface Props {
    colSpan: number;
    search: string;
}

function NoSearch({ colSpan, search }: Props): JSX.Element {
    return (
        <tr>
            <td colSpan={colSpan}>
                No se encontraron resultados '{search}'.
            </td>
        </tr>
    );
}

export default NoSearch;