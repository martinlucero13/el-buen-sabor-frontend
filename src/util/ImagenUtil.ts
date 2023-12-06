export function generateImageName(nombre: string): string {
    const currentDateTime = new Date().toISOString().replace(/[-T:.]/g, ''); 
    const extension = nombre.split('.').pop();
    return `${currentDateTime}.${extension}`;
}

export function isValidImagen(file: File): boolean {
    return isImage(file) && isSizeAcceptable(file);
}

function isImage(file: File): boolean {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split(".").pop();
  
    return fileExtension !== undefined && allowedExtensions.includes(fileExtension);
}

function isSizeAcceptable(file: File): boolean {
    return file.size <= 10 * 1024 * 1024;
}