export const formatearFecha = (fecha: Date | string): string => {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha.replace(' ', 'T')); // Reemplazar espacio por "T" para convertir a formato ISO 8601
    }
  
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate() +1).padStart(2, '0');
    const hora = String(fecha.getUTCHours()).padStart(2, '0');
    const minuto = String(fecha.getUTCMinutes()).padStart(2, '0');
    const segundo = String(fecha.getUTCSeconds()).padStart(2, '0');
    const fechaFormateada=`${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    return fechaFormateada;
};

export const sumarFechas = (fecha: string, horaEstimadaFin: string): string => {
    const fechaParts = fecha.split(' ');
    const horaEstimadaFinParts = horaEstimadaFin.split(':');
  
    
    //console.log(fechaParts[1]);
    const fechaObj = new Date(fechaParts[0]);
    const fechaTiempo = String(fechaParts[1]).split(':');
    fechaObj.setHours(
        parseInt(fechaTiempo[0]) + parseInt(horaEstimadaFinParts[0]),
        parseInt(fechaTiempo[1]) + parseInt(horaEstimadaFinParts[1]),
        parseInt(fechaTiempo[2]) + parseInt(horaEstimadaFinParts[2])
    );
  
    const año = fechaObj.getFullYear();
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaObj.getDate()+1).padStart(2, '0');
    const hora = String(fechaObj.getHours()).padStart(2, '0');
    const minuto = String(fechaObj.getMinutes()).padStart(2, '0');
    const segundo = String(fechaObj.getSeconds()).padStart(2, '0');
  

    return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
};