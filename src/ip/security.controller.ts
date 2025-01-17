import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { SecurityService } from "./security.service";

@Controller('ip')
export class IpController {
    constructor(
        private readonly securityService: SecurityService,
    ){}
    @Patch()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async desbloquearIpyUsuario( @Body('ip') ip: string, @Body('username') username: string){
        await this.securityService.desbloquearIpyUsuario(ip,username);
        return { message: 'IP y usuario desbloqueados correctamente'}
    }



}