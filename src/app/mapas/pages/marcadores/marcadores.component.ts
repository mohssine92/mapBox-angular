import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';



interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker; // ? opcional
  centro?: [number, number]
}




@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }


    `
  ]
})

export class MarcadoresComponent implements AfterViewInit  {


  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ];

  /*Arreglo de marcadores - necesidades mantener marcadores en arreglo para me permita listarlos*/
  marcadores: MarcadorColor[] = [];




  constructor() { }




  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({ // Objeto de mi mapa
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center ,
      zoom: this.zoomLevel
    });

    //this.leerLocalStorage();

















    //314
     /*Marker perzonalizado - darle Estilos redondo etc - como Airbnb - un poco de jquery
       lo que realmente debe estar en foreach de lectura : [{apart}] marcadores es la instancia de marcador y este elemento  porque
       en cada recorrido del foreach debe asignar precio al estilo y  lng , lat al instancia del marcador
       asi sale la mapa con marcadores con precios de apartamientos disponibles en la geolocalizacion
     */
     //const markerHtml: HTMLElement = document.createElement('div');
     //markerHtml.innerHTML = 18 + '$';


     /* crear nueva instancia del marcador
      * setear lng , lat
      * y indicar en que instancia de mapa va caer este marcador
      * const marker : esta referecia nos va servir porsi acasi queremos agregarle algun evento o algun listener a ese marcador
      */
    //  const marker =  new mapboxgl.Marker({ // Perzonalizar mi marker
    //   //element: markerHtml, //perzonalizar marker agragandoloe html
    //   color: 'red'

    //  })
    //  .setLngLat( [-8.003272973656891, 31.64113499066991] )
    //  .addTo( this.mapa )

     // new mapboxgl.Marker({ aprobado dos instancias de marcadores add a una instancia de mapa : hace caer los marcadores en la misma mapa

     // })
     //  .setLngLat( [-8.007611793714375, 31.6388169015392] )
     //  .addTo( this.mapa )
  }



  /* 315 añadir marcadores de manera dinamica unico que hat que hacer mandar coordennadas esto es todo . en caso de recupera de un debe coleccion de Objetos de locales
     atraves de un servicio Provedor se hace la lectura de la coleccion - en cada recorrido crea instancia de marker definiendo las corredenadas correspondientes
     tambien pude usar algo de jsqueru al seleccionar muestra algo animacion con mas informacion etc ...
   *
   */
  agregarMarcador( ) {

    // colors son numeros - generar decimales aleatorios : dar color aleatorio
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));


    /* marcador le seteamos Lng y lat this.center pero si lo movemos la instancia del marcador sabe donde se encuentra exactamente
     *
     */
    const nuevoMarcador = new mapboxgl.Marker({ // crear instancia del marcador
      draggable: true, // poner en true - permite - mover instancia del marker
      color
    })
      .setLngLat( this.center ) // definir coordenada centrales en este caso
      .addTo( this.mapa ); // definir la instancia de la mapa donde va caer esta instacia de este marcador


    this.marcadores.push({
      color,
      marker: nuevoMarcador // nuevoMarcador referencia a cada instancia

    });

    console.log(this.marcadores)


  }

  /* irMarcador (marker: mapboxgl.Marker) { // 317
   /* tener en cuenta recibir coordenadas del localstorage como si hubiera recibirlo de db a nivel de funcionalidad
    * FlyTo es un metode del la instancia de la mapa pide unas coordenadas que requiere la mapa para moverse a la ubicacion de la coordinadas
    */
   irMarcador( marker: mapboxgl.Marker ) {
     //const { marker:marcador } = marker

    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }



  borrarMarcador( ){


  }










}
/* vamos a trabajar con marcadores
 * como poder colocar informacion en la mapa
 /* 315 - Añadir marcadores de forma dinamica : por ejemplo si tenemos las corrdenadas almacenadas en db
    *
    */




 /* !!airbnb selecciona unos objetos de apartamientos y los coloca en una mapa
   pero los marcadores le aplica estilos ,  mapbox tiene titurial de agregar estilos ver documentacion
   la idea es cuando renderize el componente, nosotros atraves de servicio http debe traer los objetos de las apartamientosy tomar una tactica a trabajar (siempre por refrencia)
   es decir mantener referencia de los objetos parque cada vez puedo obtener info del objeto como marcadores , precios , google place etc , imgs ,!!
 */
