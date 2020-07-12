import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import Swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
    public router: Router,
    public _subirarchivoservice: SubirArchivoService) {

    this.cargarStorage();
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        Swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      });
  }
  // Login de google
  loginGoogle(token: string) {

    console.log(this.token);

    let url = URL_SERVICIOS + '/login/goolge';

    return this.http.post(url, { token })
      .map((resp: any) => {
        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
        return true;
      });

  }
  // si el usuario esta logeado
  estaLogueado() {
    return (this.token.length > 1 ? true : false);
  }

  // local storage

  guardarLocalStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {

        console.log(resp);

        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);

        return true;
      })
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  actualizarUsuario(_usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;

    url += '?token=' + this.token;

    this.usuario.nombre = _usuario.nombre;
    this.usuario.email = _usuario.email;

    //console.log(this.usuario);


    return this.http.put(url, this.usuario)
      .map((resp: any) => {
        let usu: Usuario = resp.usuario;

        this.guardarLocalStorage(usu._id, this.token, usu);
        Swal('Usuario actualizado', this.usuario.nombre, 'success');
        return true;
      })

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirarchivoservice.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarLocalStorage(id, this.token, this.usuario);
        Swal('Imagen actualizada', this.usuario.nombre, 'success');
        console.log(this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });

  }
}
