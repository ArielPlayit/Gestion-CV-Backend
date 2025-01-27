import { Module, OnApplicationBootstrap, forwardRef } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ProfesorModule } from 'src/profesor/profesor.module';
import { AuthModule } from 'src/auth/auth.module'; // Asegúrate de importar AuthModule
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    ProfesorModule,
    TypeOrmModule.forFeature([Usuario]),
    forwardRef(() => AuthModule), // Asegúrate de incluir AuthModule en imports
  ],
  controllers: [UsuarioController],  // Aquí va el controlador
  providers: [UsuarioService],       // Aquí va el servicio
  exports: [UsuarioService, TypeOrmModule],  
})
export class UsuarioModule implements OnApplicationBootstrap {
  constructor(private readonly usuarioService: UsuarioService) {}

  async onApplicationBootstrap() {
    // Verificar si ya existe el usuario ADMIN
    const adminExists = await this.usuarioService.findByUsername('admin');
    if (!adminExists) {
      // Crear usuario admin
      const hashedPassword = await bcrypt.hash('admin', 10);
      await this.usuarioService.create({
        username: 'admin',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        rol: 'ADMIN',
      });
      console.log('Usuario ADMIN creado con éxito');
    }
  }
}
