import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { element } from 'protractor';
import { threadId } from 'worker_threads';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  forma: FormGroup;
  auth2: any;



  constructor(public router: Router,
    public usuarioservice: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    });

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '975001686561-qbfkejmgjoevovpssmuqne6iteeipscp.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });

  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let token = googleUser.getAuthResponse().id_token;

      //console.log(token);

      this.usuarioservice.loginGoogle(token)
        .subscribe(resp => window.location.href = '#/dashboard');

    });
  }

  ingresar(forma: NgForm) {

    console.log(forma);
    if (forma.invalid) {
      return true;
    }

    let usuario = new Usuario(null, null, forma.value.email, forma.value.password);

    this.usuarioservice.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
  }

}
