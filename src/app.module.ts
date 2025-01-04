import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ProfesorModule } from './profesor/profesor.module';
import { UsuarioModule } from './usuario/usuario.module';
import { IdiomaModule } from './idioma/idioma.module';
import { CursoModule } from './curso/curso.module';
import { TesisModule } from './tesis/tesis.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { ReconocimientoModule } from './reconocimiento/reconocimiento.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { SolicitudModule } from './solicitud/solicitud.module';
import { PdfModule } from './pdf/pdf.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Usuario]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProfesorModule,
    UsuarioModule,
    IdiomaModule,
    CursoModule,
    TesisModule,
    ProyectoModule,
    PublicacionModule,
    ReconocimientoModule,
    DepartamentoModule,
    AuthModule,
    SolicitudModule,
    PdfModule,
  ],
})
export class AppModule {}
