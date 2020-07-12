import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, rejects) => {

      let formdata = new FormData();
      let xhr = new XMLHttpRequest();

      console.log(archivo);


      formdata.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));

          } else {
            console.log('Fallo la subida');
            rejects(xhr.response);
          }
        }
      };
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formdata);
    });
  }
}
