import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { ProfesorService } from 'src/profesor/profesor.service';

@Injectable()
export class PdfService {
  private readonly HEADER_FONT_SIZE = 18;
  private readonly TITLE_FONT_SIZE = 24;
  private readonly SECTION_FONT_SIZE = 20;
  private readonly TEXT_FONT_SIZE = 14;
  private readonly SUB_TEXT_FONT_SIZE = 12;
  private readonly PRIMARY_COLOR = '#2c3e50'; // Color oscuro para títulos
  private readonly SECONDARY_COLOR = '#3498db'; // Color azul para detalles

  constructor(private readonly profesorService: ProfesorService) {}

  async generateCV(profesorId: number): Promise<Buffer> {
    const profesor = await this.profesorService.findOne(profesorId);
    if (!profesor) {
      throw new Error('Profesor no encontrado');
    }

    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));

    this.addHeader(doc);
    this.addPersonalInfo(doc, profesor);
    this.addSectionDivider(doc);
    this.addLanguages(doc, profesor);
    this.addSectionDivider(doc);
    this.addCourses(doc, profesor);
    this.addSectionDivider(doc);
    this.addProjects(doc, profesor);
    this.addSectionDivider(doc);
    this.addPublications(doc, profesor);
    this.addSectionDivider(doc);
    this.addRecognitions(doc, profesor);
    this.addSectionDivider(doc);
    this.addTheses(doc, profesor);

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }

  private addHeader(doc: PDFKit.PDFDocument): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.HEADER_FONT_SIZE)
      .text('Universidad de Ciencias Informáticas', { align: 'center', underline: true })
      .moveDown(0.5);

    doc
      .fillColor(this.SECONDARY_COLOR)
      .fontSize(this.HEADER_FONT_SIZE - 2)
      .text('Dirección de la Institución', { align: 'center' })
      .moveDown(2);

      doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.TITLE_FONT_SIZE)
      .font('Helvetica')
      .font('Helvetica-Bold') // Aplicar negrita
      .text('Curriculum Vitae', { align: 'center' })
      .font('Helvetica') // Restaurar la fuente normal
      .moveDown(2);
  }
  private formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : 'No especificado';
  }

  private addPersonalInfo(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Información Personal', { underline: true })
      .moveDown(0.5);

    doc
      .fillColor(this.SECONDARY_COLOR)
      .fontSize(this.TEXT_FONT_SIZE)
      .text(`Nombre: ${profesor.nombre || 'No especificado'}`, { indent: 20 })
      .text(`Primer Apellido: ${profesor.primer_apellido || 'No especificado'}`, { indent: 20 })
      .text(`Segundo Apellido: ${profesor.segundo_apellido || 'No especificado'}`, { indent: 20 })
      .text(`Email: ${profesor.email || 'No especificado'}`, { indent: 20 })
      .text(`Teléfono: ${profesor.telefono || 'No especificado'}`, { indent: 20 })
      .text(`Fecha de Nacimiento: ${ this.formatDate(profesor.fecha_nac) || 'No especificado'}`, { indent: 20 })
      .moveDown();

    if (profesor.graduado_de && profesor.graduado_lugar && profesor.graduado_fecha) {
      doc.text(`Graduado de ${profesor.graduado_de} en ${profesor.graduado_lugar}, el ${this.formatDate(profesor.graduado_fecha)}`, { indent: 20 });
    }
    if (profesor.grado_cientifico && profesor.fecha_de_grado_cientifico && profesor.lugar_de_grado_cientifico) {
      doc.text(`Grado Científico: ${profesor.grado_cientifico}. Obtenido el ${this.formatDate(profesor.fecha_de_grado_cientifico)}, en ${profesor.lugar_de_grado_cientifico}`, { indent: 20 });
    }
    if (profesor.categoria_docente && profesor.fecha_de_categoria_docente && profesor.lugar_de_categoria_docente) {
      doc.text(`Categoría Docente: ${profesor.categoria_docente}. Obtenido el ${this.formatDate(profesor.fecha_de_categoria_docente)}, en ${profesor.lugar_de_categoria_docente}`, { indent: 20 });
    }
    if (profesor.categoria_cientifica && profesor.fecha_de_grado_cientifico && profesor.lugar_de_categoria_cientifica) {
      doc.text(`Categoría Científica: ${profesor.categoria_cientifica}. Obtenido el ${this.formatDate(profesor.fecha_de_grado_cientifico)}, en ${profesor.lugar_de_categoria_cientifica}`, { indent: 20 });
    }
    if (profesor.posicion_actual && profesor.departamento) {
      doc.text(`Posición Actual: ${profesor.posicion_actual} del departamento de ${profesor.departamento}`, { indent: 20 });
    }
    doc.moveDown();
  }

  private addLanguages(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Idiomas', { underline: true })
      .moveDown(0.5);

    if (profesor.idioma && profesor.idioma.length > 0) {
      profesor.idioma.forEach((idioma: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Idioma: ${idioma.idioma}`, { indent: 20 })
          .text(`Lee: ${idioma.lee ? 'si' : 'no'}`, { indent: 30 })
          .text(`Traduce: ${idioma.traduce ? 'si' : 'no'}`, { indent: 30 })
          .text(`Escribe: ${idioma.escribe ? 'si' : 'no'}`, { indent: 30 })
          .text(`Habla: ${idioma.habla ? 'si' : 'no'}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay idiomas registrados.', { indent: 20 });
    }
  }

  private addCourses(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Cursos', { underline: true })
      .moveDown(0.5);

    if (profesor.curso && profesor.curso.length > 0) {
      profesor.curso.forEach((curso: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Nombre del Curso: ${curso.nombre_del_curso}`, { indent: 20 })
          .text(`Institución: ${curso.institucion}`, { indent: 30 })
          .text(`Tipo: ${curso.tipo}`, { indent: 30 })
          .text(`Fecha de Inicio: ${this.formatDate(curso.fechainicio)}`, { indent: 30 })
          .text(`Fecha de Fin: ${this.formatDate(curso.fechafin)}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay cursos registrados.', { indent: 20 });
    }
  }

  private addProjects(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Proyectos', { underline: true })
      .moveDown(0.5);

    if (profesor.proyecto && profesor.proyecto.length > 0) {
      profesor.proyecto.forEach((proyecto: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Nombre del Proyecto: ${proyecto.nombre}`, { indent: 20 })
          .text(`Descripción: ${proyecto.descripcion}`, { indent: 30 })
          .text(`Rol: ${proyecto.rol}`, { indent: 30 })
          .text(`Fecha de Inicio: ${this.formatDate(proyecto.fechaInicio)}`, { indent: 30 })
          .text(`Fecha de Fin: ${this.formatDate(proyecto.fechaFin)}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay proyectos registrados.', { indent: 20 });
    }
  }

  private addPublications(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Publicaciones', { underline: true })
      .moveDown(0.5);

    if (profesor.publicacion && profesor.publicacion.length > 0) {
      profesor.publicacion.forEach((publicacion: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Título: ${publicacion.titulo}`, { indent: 20 })
          .text(`Tipo: ${publicacion.tipo}`, { indent: 30 })
          .text(`Lugar: ${publicacion.lugar}`, { indent: 30 })
          .text(`Fecha: ${this.formatDate(publicacion.fecha)}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay publicaciones registradas.', { indent: 20 });
    }
  }

  private addRecognitions(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Reconocimientos', { underline: true })
      .moveDown(0.5);

    if (profesor.reconocimiento && profesor.reconocimiento.length > 0) {
      profesor.reconocimiento.forEach((reconocimiento: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Nombre: ${reconocimiento.nombre}`, { indent: 20 })
          .text(`Lugar: ${reconocimiento.lugar}`, { indent: 30 })
          .text(`Fecha: ${this.formatDate(reconocimiento.fecha)}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay reconocimientos registrados.', { indent: 20 });
    }
  }

  private addTheses(doc: PDFKit.PDFDocument, profesor: any): void {
    doc
      .fillColor(this.PRIMARY_COLOR)
      .fontSize(this.SECTION_FONT_SIZE)
      .text('Tesis', { underline: true })
      .moveDown(0.5);

    if (profesor.tesis && profesor.tesis.length > 0) {
      profesor.tesis.forEach((tesis: any) => {
        doc
          .fillColor(this.SECONDARY_COLOR)
          .fontSize(this.SUB_TEXT_FONT_SIZE)
          .text(`Título: ${tesis.titulo}`, { indent: 20 })
          .text(`Nivel: ${tesis.nivel}`, { indent: 30 })
          .text(`Año de Defensa: ${this.formatDate(tesis.anodefensa)}`, { indent: 30 })
          .moveDown();
      });
    } else {
      doc.text('No hay tesis registradas.', { indent: 20 });
    }
  }

  private addSectionDivider(doc: PDFKit.PDFDocument): void {
    doc.moveDown(0.5).lineWidth(1).strokeColor('#cccccc').lineCap('butt').moveTo(50, doc.y).lineTo(550, doc.y).stroke().moveDown(1);
  }
}