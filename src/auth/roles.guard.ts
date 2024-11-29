import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles permitidos del decorador
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si no hay roles definidos, permite el acceso
    }

    // Extrae el usuario de la solicitud
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica si el rol del usuario está incluido en los roles permitidos
    return roles.includes(user.rol);
  }
}