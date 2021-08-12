import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';





@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0,0]; // recibir prop del ccomponnete padre
  @ViewChild('mapa') divMapa!: ElementRef; //ref local de element of template

  constructor() { }


  /* hook se dispara despues de la construccion de los elementos html del template */
  ngAfterViewInit(): void { // instancia de la mapa y mantener ref

    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false // no permitir al user mover la mapa
    });


    new mapboxgl.Marker() // instania del marker y manterner ref al marcer
        .setLngLat( this.lngLat )
        .addTo( mapa );
  }

}
