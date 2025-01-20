import { Curso } from "src/curso/entities/curso.entity";
import { Departamento } from "src/departamento/entities/departamento.entity";
import { Idioma } from "src/idioma/entities/idioma.entity";
import { Proyecto } from "src/proyecto/entities/proyecto.entity";
import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Reconocimiento } from "src/reconocimiento/entities/reconocimiento.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";

export enum CategoriaDocente {
    Sin_Categoria = 'Sin Categoría',
    Auxiliar_Tecnico_de_la_Docencia_de_Nivel_Superior = 'Auxiliar Técnico de la Docencia de Nivel Superior',
    Instructor = 'Instructor', 
    Profesor_Asistente = 'Profesor Asistente',
    Profesor_Auxiliar = 'Profesor Auxiliar', 
    Profesor_Titular = 'Profesor Titular', 
    Profesor_Consultante = 'Profesor Consultante',
    Profesor_Invitado = 'Profesor Invitado', 
    Profesor_Emerito = 'Profesor Emérito'
}
export enum GradoCientifico{
    Sin_Grado = 'Sin Grado',
    Master_en_Ciencias = 'Master en Ciencias',
    Doctor_en_Ciencias = 'Doctor en Ciencias'
}
export enum CategoriaCientifica{
    Sin_Categoria = 'Sin Categoría', 
    Aspirante_a_Investigador = 'Aspirante a Investigador', 
    Investigador_Agregado = 'Investigador Agregado', 
    Investigador_Auxiliar = 'Investigador Auxiliar', 
    Investigador_Titular = 'Investigador Titular', 
    Investigador_de_Merito = 'Investigador de Mérito', 
    Investigador_Colaborador = 'Investigador Colaborador',
}


@Entity()
export class Profesor {
    @PrimaryColumn()id: number;
    
    @Column('text',{unique: true, nullable: true})email: string;

    @Column('text',{ nullable: true})nombre: string;

    @Column({ nullable: true})primer_apellido: string;

    @Column({ nullable: true})segundo_apellido: string;
 
    @Column({ nullable: true})fecha_nac: Date;

    @Column('numeric',{ nullable: true})telefono: string;

    @Column({ nullable: true})graduado_de: string;

    @Column({ nullable: true})graduado_fecha: Date;

    @Column({ nullable: true})graduado_lugar: string;

    @Column({
        type: 'enum',
        enum: GradoCientifico,
        default: GradoCientifico.Sin_Grado
    },) grado_cientifico: string;
    @Column('date',{ nullable: true})fecha_de_grado_cientifico: Date;
    @Column({ nullable: true})lugar_de_grado_cientifico: string;
    
    @Column({
        type: 'enum',
        enum: CategoriaDocente,
        default: CategoriaDocente.Sin_Categoria
    })  categoria_docente: string;
    @Column('date',{ nullable: true})fecha_de_categoria_docente: Date;
    @Column({ nullable: true})lugar_de_categoria_docente: string;
    
    @Column({
        type: 'enum',
        enum: CategoriaCientifica,
        default: CategoriaCientifica.Sin_Categoria
    })  categoria_cientifica: string;
    @Column('date',{ nullable: true})fecha_de_categoria_cientifica: Date;
    @Column({ nullable: true})lugar_de_categoria_cientifica: string;
    
    @Column('text',{ nullable: true})posicion_actual: string;

    @OneToOne(() => Usuario, usuario => usuario.profesor, {onDelete: 'CASCADE', nullable: true})
    @JoinColumn() usuario: Usuario;
    @OneToMany(() => Idioma, idioma => idioma.profesor, {cascade: true})
    idioma: Idioma[];
    @OneToMany(() => Curso, curso => curso.profesor, {cascade: true})
    curso: Curso[];
    @OneToMany(() => Tesis, tesis => tesis.profesor, {cascade: true})
    tesis: Tesis[];
    @OneToMany(() => Proyecto, proyecto => proyecto.profesor, {cascade: true})
    proyecto: Proyecto[];
    @OneToMany(() => Publicacion, publicacion => publicacion.profesor,{cascade: true})
    publicacion: Publicacion[];
    @OneToMany(() => Reconocimiento, reconocimiento => reconocimiento.profesor, {cascade: true})
    reconocimiento: Reconocimiento[];
    @ManyToOne(() => Departamento, departamento => departamento.profesores)
    departamento: Departamento;
}
