import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanActivate {

  constructor(public _usuarioservice: UsuarioService,
    public router: Router) {


  }

  canActivate(): boolean {

    if (this._usuarioservice.estaLogueado()) {
      // console.log('pasó el guard');
      return true;
    } else {
      // console.log('bloqueado por el guard');

      this.router.navigate(['/login']);

      return false;
    }
  }


}
