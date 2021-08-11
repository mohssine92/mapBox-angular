import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';


import * as mapboxgl from 'mapbox-gl'; // ver full-screnn  para mas detalles


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%; /* 200%; */
      width: 100%;
    }/* el div donde se renderiza la mapa por defect tiene demensiones de 0,0 pixeles : mapa invisible , simplemente le digo occupa 100% del html (h,w)
      * tner en cueta para mostra otros elemntos encima requiere class de z-index */

    .row {

      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 99999;
      width: 400px;


    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {



  /* si tuvieramos mas que un componente llamado ZoomRange , entoces cada uno de etsas instancias de ZoomRange va tener un referencia local con id difrerente
   * asi esta ref local me va ayudar a eso , evitar conflictos de cajas html - momento de renderizar varias mapas en un componente
    @ViewChild : decorador 'mapa': por refrencia local que puse AL DIV
   */
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;// tipado - estoy trabanado con libreria de js :recuerda dentro de refrencia de importacion de libreria hay un Objeto llamado MAp (de esta manera estoy poniendo tipado)
  zoomLevel: number = 18;
  center: [number, number] = [ -8.00339635477286, 31.640863254150435 ]; //(longitud , latitud )

  constructor() { }


  /* Regla de Oro . cuando tenrmos implmentado On : escucha de eventos . evento pertenece a un Objeto etc .. anque salgo del componente sigue escuchando .
   * la idea es : cuando yo salgo de un componente termino estos eventos o observables (destruir estos listeners)
  */
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {/* funcion a ejecutar para limpieza */});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }


  ngAfterViewInit(): void {
   /* porque ngOnit no y AfterViewInit si : porque este hook se dispara despues de la construccion de los elemento de html del componente y para la mostracion de la mapa occupo Refrencia Local
      a un elemnto html , necesito que exista el elemnto para tener a el refrerencia .
      console.log(this.divMapa.nativeElement) 309
    */

    this.mapa = new mapboxgl.Map({ // Object Opcions

      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,// 33.5698021787871, -7.608647113957417 recuerden que googlemaps viene con (longitud, latitud ) mapBox al reves (punto-central)
      zoom: this.zoomLevel // nivel de zoom por defecto - luego el zoom lo hazemos nostros atraves del cursor

    });


    /* para Obtencion valor actual y preciso del Zomm , necesito poner un listerner en la mapa
     * event zoom es decir cualquier cambio por m/S en zoom va disparando eventos - tengo la libertad de usar object event recibido en callback o aprovechar usando otros metodo
     * del objeto mapa que me logran mi objetivo facil y usar otros metodos para cumplir otros objetivos relacionado etc ...
     * no me importa la funcinalida como se cambio el zoom - estoy escuchando cualquier cambio en el zoom y hago tareas
    */
   this.mapa.on('zoom', () =>{ /* 311 - ver docs sobre los eventos que proporciona - aver que puede sacar - taget es el evento  */
    this.zoomLevel = this.mapa.getZoom();

   })


   /* escuchar  un event se dispara  justo cuando se termina de hacer zoom
    * la idea si hacemos zomm mas grande que 18 al terminar movimiento de zoom imediatamente mover el zoom a 18 , como zoom maximo
    */
   this.mapa.on('zoomend', (ev) => {

      if ( this.mapa.getZoom() > 18 ) {
         this.mapa.zoomTo( 18 ); // este metodo para mover zomm a un punto
       }
   });


   /* Movimiento del mapa lo que escucha de este avent
    * recuerda targ es evento de mapBOx , original... es evento de html de la pagimna que se esta disparando
    */
   this.mapa.on('move', (event) => {
    const target = event.target;
    const { lng, lat } = target.getCenter();
    this.center = [lng, lat];
    console.log(this.center)
   });




  }


  zoomOut() { //309
    /* al ref de this.mapa (gracias al tipado , hay muchos metodo y eventos - en este caso usamos metodo ZoomOut) */
    this.mapa.zoomOut();
  }


  zoomIn() { //309
    this.mapa.zoomIn();
  }


  zoomCambio( valor: string ) {
    /* este metodo para mover zomm a un punto - y listner actualiza la prop
     * recibo numero de tipo string -lo convierto a numero de tipo number, porque mi funcion mapa recibe numero de tipo number , no string
    */
    this.mapa.zoomTo( Number(valor) );
  }








}
/* haciendo zooms controlando la ubicacion de la mapa
 * punto central y otras cosas
 * aprender a trabajar con lng y lagt : donde esta viendo el usuario y tambien poder interectuar con la mapa
 * tener cuanta al hacer animacioncon el mouse : el xoom esta cambiando
 * noten tenemos control en absoluto del Objeto mapa gracias a la instancia que nos Ofrece MApbox esta alamacenada en this.map
*/

