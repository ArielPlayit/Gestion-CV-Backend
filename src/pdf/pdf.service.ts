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

    doc.fontSize(12).text('Universidad de Ciencias Informaticas', { align: 'center' });
    doc.fontSize(10).text('Dirección de la Institución', { align: 'center' });
    doc.moveDown();
    doc.moveDown();

    doc.fontSize(20).text('Curriculum Vitae', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nombre: ${profesor.nombre}`);
    doc.fontSize(14).text(`Primer Apellido: ${profesor.primer_apellido}`)
    doc.fontSize(14).text(`Segundo Apellido: ${profesor.segundo_apellido}`)
    doc.text(`Email: ${profesor.email}`);
    doc.text(`Teléfono: ${profesor.telefono}`);
    doc.text(`Fecha de Nacimiento: ${profesor.fecha_nac}`);
    doc.text(`Graduado de ${profesor.graduado_de} en ${profesor.graduado_lugar}, el ${profesor.graduado_fecha}`)
    doc.text(`Grado Científico: ${profesor.grado_cientifico}. Obtenido el ${profesor.fecha_de_grado_cientifico}, en ${profesor.lugar_de_grado_cientifico}`);
    doc.text(`Categoría Docente: ${profesor.categoria_docente}. Obtenido el ${profesor.fecha_de_categoria_docente}, en ${profesor.lugar_de_categoria_docente}`);
    doc.text(`Categoría Científica: ${profesor.categoria_cientifica}. Obtenido el ${profesor.fecha_de_grado_cientifico}, en ${profesor.lugar_de_categoria_cientifica}`);
    doc.text(`Posición Actual: ${profesor.posicion_actual} del departamento de ${profesor.departamento}`);
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

    doc.fontSize(16).text('Proyecto', { underline: true });
    if (profesor.proyecto && profesor.proyecto.length > 0) {
      profesor.proyecto.forEach((proyecto) => {
        doc.fontSize(12).text(`Nombre del Proyecto: ${proyecto.nombre}`);
        doc.text(`Descripcion: ${proyecto.descripcion}`);
        doc.text(`Rol: ${proyecto.rol}`);
        doc.text(`Fecha de Inicio: ${proyecto.fechaInicio}`);
        doc.text(`Fecha de Fin: ${proyecto.fechaFin}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay proyectos registrados.');
    }

    doc.fontSize(16).text('Publicacion', { underline: true });
    if (profesor.publicacion && profesor.publicacion.length > 0) {
      profesor.publicacion.forEach((publicacion) => {
        doc.fontSize(12).text(`Nombre de la Publicacion: ${publicacion.titulo}`);
        doc.text(`Tipo: ${publicacion.tipo}`);
        doc.text(`Lugar: ${publicacion.lugar}`);
        doc.text(`Fecha: ${publicacion.fecha}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay publicaciones registradas.');
    }

    doc.fontSize(16).text('Reconocimiento', { underline: true });
    if (profesor.reconocimiento && profesor.reconocimiento.length > 0) {
      profesor.reconocimiento.forEach((reconocimiento) => {
        doc.fontSize(12).text(`Nombre del Reconocimiento: ${reconocimiento.nombre}`);
        doc.text(`Lugar: ${reconocimiento.lugar}`);
        doc.text(`Fecha: ${reconocimiento.fecha}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay reconocimientos registrados.');
    }

    doc.fontSize(16).text('Tesis', { underline: true });
    if (profesor.tesis && profesor.tesis.length > 0) {
      profesor.tesis.forEach((tesis) => {
        doc.fontSize(12).text(`Titulo: ${tesis.titulo}`);
        doc.text(`Nivel: ${tesis.nivel}`);
        doc.text(`Fecha: ${tesis.anodefensa}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay tesis registradas.');
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