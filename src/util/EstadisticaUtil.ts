import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

export const estadisticaOpciones = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right' as const,
        },
    },
};

export const sortData = (data: any[], sortByDesc: boolean, sortProperty: string) => {
    return [...data].sort((a, b) => {
        if (sortByDesc) {
            return b[sortProperty] - a[sortProperty];
        } else {
            return a[sortProperty] - b[sortProperty];
        }
    });
};
