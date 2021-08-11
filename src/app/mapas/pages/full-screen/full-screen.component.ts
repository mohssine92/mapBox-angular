import { Component, OnInit } from '@angular/core';


/* sistema de impotacion al trabajar con js - nosotro trabajamos con ts
 * existe un paquete enorme que tiene tipado de librerias que no fueron escritas en typescript (de  momento en js no existe tipado interfaces )
 * istall paquete de tipado que señala al consola .
 * @types es paquete donde se encuentra miles de librerias que no fueran escritas en ts pero tiene su anotacion en ts paraque podemos usar sin ningun inconviniente y nosotros
 * * as mapboxgl : es decir tome toda esta livreria de js mapbox-gl y la conoce en este archivo como mapboxgl
 * sepamos que Objeto usar
*/
//var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from 'mapbox-gl';






@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      width: 100%;
    }/* el div donde se renderiza la mapa por defect tiene demensiones de 0,0 pixeles : mapa invisible , simplemente le digo occupa 100% del html (h,w) */
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    var map = new mapboxgl.Map({ // Object Opcions

      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -8.00339635477286, 31.640863254150435 ] ,// 33.5698021787871, -7.608647113957417 recuerden que googlemaps viene con (latitud , longitud ) mapBox al reves (punto-central)
      zoom: 18 // nivel de zoom por defecto - luego el zoom lo hazemos nostros atraves del cursor

     });


  }

}
/* aqui mostramos mapa pantalla completa
 *
 */
