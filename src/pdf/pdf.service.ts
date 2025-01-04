import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { ProfesorService } from 'src/profesor/profesor.service';

@Injectable()
export class PdfService {
  constructor(private readonly profesorService: ProfesorService) {}

  async generateCV(profesorId: number): Promise<Buffer> {
    const profesor = await this.profesorService.findOne(profesorId);

    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      return pdfData;
    });

    doc.fontSize(20).text('Curriculum Vitae', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nombre: ${profesor.nombre}`);
    doc.text(`Email: ${profesor.email}`);
    doc.text(`Teléfono: ${profesor.telefono}`);
    doc.text(`Fecha de Nacimiento: ${profesor.fecha_nac}`);
    doc.text(`Grado Científico: ${profesor.grado_cientifico}`);
    doc.text(`Categoría Docente: ${profesor.categoria_docente}`);
    doc.text(`Categoría Científica: ${profesor.categoria_cientifica}`);
    doc.text(`Posición Actual: ${profesor.posicion_actual}`);
    doc.moveDown();

    // Agregar más secciones según sea necesario
    doc.fontSize(16).text('Idiomas', { underline: true });
    if (profesor.idioma && profesor.idioma.length > 0) {
      profesor.idioma.forEach((idioma) => {
        doc.fontSize(12).text(`Idioma: ${idioma.idioma}`);
        doc.text(`Lee: ${idioma.lee}`);
        doc.text(`Traduce: ${idioma.traduce}`);
        doc.text(`Escribe: ${idioma.escribe}`);
        doc.text(`Habla: ${idioma.habla}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay idiomas registrados.');
    }

    doc.fontSize(16).text('Cursos', { underline: true });
    if (profesor.curso && profesor.curso.length > 0) {
      profesor.curso.forEach((curso) => {
        doc.fontSize(12).text(`Nombre del Curso: ${curso.nombre_del_curso}`);
        doc.text(`Institución: ${curso.institucion}`);
        doc.text(`Tipo: ${curso.tipo}`);
        doc.text(`Fecha de Inicio: ${curso.fechainicio}`);
        doc.text(`Fecha de Fin: ${curso.fechafin}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay cursos registrados.');
    }

    // Finalizar el documento
    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }
}