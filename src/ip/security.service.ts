import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { BlockedIp } from './entities/blocked-ip.entity';
import { FailedAttempt } from './entities/failedattempt.entity';

@Injectable()
export class SecurityService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(BlockedIp)
    private readonly blockedIpRepository: Repository<BlockedIp>,
    @InjectRepository(FailedAttempt)
    private readonly failedAttemptRepository: Repository<FailedAttempt>,
  ) {}

  async verificarIpBloqueada(ip: string): Promise<boolean> {
    const blockedIp = await this.blockedIpRepository.findOne({ where: { ip } });
    return !!(blockedIp && blockedIp.blockedUntil > new Date());
  }

  async verificarUsuarioBloqueado(username: string): Promise<boolean> {
    const usuario = await this.usuarioRepository.findOne({ where: { username } });
    return !!(usuario && usuario.blockedUntil > new Date());
  }

  async registrarIntentoFallido(ip: string, username: string): Promise<void> {
    // Guardar intento fallido en la base de datos
    const failedAttempt = this.failedAttemptRepository.create({ ip, username });
    await this.failedAttemptRepository.save(failedAttempt);

    // Contar intentos fallidos recientes
    const now = new Date();

    //Bloqueo por Ip
    const ipAttempts = await this.failedAttemptRepository.count({
      where: {
        ip,
        createdAt: MoreThan(new Date(now.getTime() - 1 * 60 * 1000)), // Intentos en los últimos 15 minutos
      },
    });
    if ( ipAttempts > 4){
      const blockedUntil = new Date();
      blockedUntil.setMinutes(blockedUntil.getMinutes() + 1);
      const blockedIp = this.blockedIpRepository.create({ ip, blockedAt: new Date(), blockedUntil});
      await this.blockedIpRepository.save(blockedIp);
      console.log( `Ip bloqueada ${ip} hasta $(blockedUntil)`);
    }

    //Bloqueo por Usuario
    const userAttempts = await this.failedAttemptRepository.count({
      where: {
        username,
        createdAt: MoreThan(new Date(now.getTime() - 5 * 60 * 1000)), // Intentos en los últimos 5 minutos
      },
    });
      if (userAttempts >= 3) {
      const blockedUntil = new Date();
      blockedUntil.setMinutes(blockedUntil.getMinutes() + 1); // Bloquea el usuario durante 30 minutos
  
      const usuario = await this.usuarioRepository.findOne({ where: { username } });
      if (usuario) {
        usuario.isBlocked = true;
        usuario.blockedUntil = blockedUntil;
        await this.usuarioRepository.save(usuario);
        console.log(`Usuario ${username} bloqueado hasta ${blockedUntil}`);
      }
    }

  
  }

  async desbloquearIpyUsuario(ip: string, username: string): Promise<void> {
    await this.blockedIpRepository.delete({ip})
    const usuario = await this.usuarioRepository.findOne({ where: {username}})
    if (usuario) {
      usuario.isBlocked = false;
      usuario.blockedUntil = null;
      await this.usuarioRepository.save(usuario);
    }
    this.failedAttemptRepository.delete(ip);
  }
}