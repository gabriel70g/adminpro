import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, retry, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;

  constructor() {

    this.suscripcion = this.regresaObservable().pipe(retry(2))
      .subscribe(
        numero => console.log('Sub ', numero),
        err => console.error('Error en el obs ', err),
        () => console.log('el observador termino !')
      );

  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log('La Página se va a cerrar');
    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;


      const intervalo = setInterval(() => {
        contador += 1;

        const salida = { valor: contador };

        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    })
      .pipe(
        map(resp => resp.valor),
        filter((valor, index) => {
          if ((valor % 2) === 1) {
            // inpar
            return true;
          } else {
            // par
            return false;
          }
        })
      );

  }

}
