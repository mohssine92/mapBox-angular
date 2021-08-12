import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';



interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker; // ? opcionales - ayudar ami quese flexible mi interfaz
  centro?: [number, number]
}



/*
 recuerda bien cuando creamos un marker llamamos post , y cando movemos , usamos ref sujetamos a ella usamos event on , y disparamos update
  app muy rebotosa . el tema de update requiere identificador , usualmente de la misma manera como hemos creado color podemos usar libreria de creacion de ids
  unicos tall cual hemos visto en node curso
*/
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


  @ViewChild('mapa') divMapa!: ElementRef; // tener  referencia local en laparte de la class
  mapa!: mapboxgl.Map;
  zoomLevel: number = 5;
  center: [number, number] = [ -7.672192948874313, 31.885307467095085 ];

  /*Arreglo de marcadores - necesidades mantener marcadores en arreglo para me permita listarlos*/
  marcadores: MarcadorColor[] = [];



  constructor() { }



  /* hook se dispra despues de la construccion de los elementos de template : elementos html  */
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({ // Objeto de mi mapa
      container: this.divMapa.nativeElement, // referencia a html
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center ,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();





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
     * segun implementamos los markers se crean en center static o dinamic - luego movemos los Y el dara cuenta de la ubicacion donde se ha movido
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

    //console.log(this.marcadores)

    this.guardarMarcadoresLocalStorage(); // grabar en localstorage <=> Grabar en db usando servicio

    nuevoMarcador.on('dragend', () => {
      // estoy sujeto a la instanicis msima : objetivo la db - loca o remota este actualziada de las nuevas ccordenadas
      this.guardarMarcadoresLocalStorage();
    });


  }

   /* irMarcador (marker: mapboxgl.Marker) { // 317
   /* tener en cuenta recibir coordenadas del localstorage como si hubiera recibirlo de db a nivel de funcionalidad
    * FlyTo es un metode del la instancia de la mapa pide unas coordenadas que requiere la mapa para moverse a la ubicacion de la coordinadas
    * Obserrvaciones , las ubicaciones actuales se identifican por coordenadas - una instancia de marker dara cuenta de las coordenadas donde este movida
    * imediatamente
    * -- usualmente cuando cremos un marcador hacemos peticion post a un backend lo almacenamos en un db , es la form corercta de hacerlos persistente
    * pero en este jercico lo mantenemos de forma local usando localstorage - redux en caso de reacl segun hemos visto
    * cuando lo mevemos tambien hacemos peticion post (leer en la docs sobre eventos Observers estar escuchando paraque la db se queda en actualizacion siempre )--
    */
  irMarcador( marker: mapboxgl.Marker ) {
     //const { marker:marcador } = marker

    this.mapa.flyTo({
      center: marker.getLngLat()
    });

  }


  guardarMarcadoresLocalStorage() {
    /* recueda en local storage solo puedo grabar strings - o objeto serializado cono strings
     * JSON.stringify
     * donde debo llamar esta funcion : - cuando agrego marcador - y cuando muevo un marcador (va cambiar ubicacion debo actualizar la db(sea local o remoto))
     *
     */

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat(); // si arrastro un marcador las cooredenadas seran reflejadas(por refe onjeto js) asi en el momento de construccion..

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]
      });

    })// ya esta lsito el arreglo que quiro almacenar en local Storage

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) ); // setear prop en localstorage




  }





  // mando a llamar justo al inicializar la mapa
  leerLocalStorage() { // leer memoria y recrear marcadores
    /* airbnb : supeno estos marcadores recibidos de db ...
     * este proceso se dispara al construir el componente y elementos html (hooks) - cuando tenga ya la instancia de la mapa lista
     * alli solicito mi servicio http y empiezo a hacerle caer an la mapa con css de precios
     */

    if ( !localStorage.getItem('marcadores') ) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! ); // ! confi en mis siempre tendras valor en este punto

    //console.log(lngLatArr)

    lngLatArr.forEach( m => { // recuperacion del arreglo

      const newMarker = new mapboxgl.Marker({ // instancia del marcador
        color: m.color,
        draggable: true
        //elemento : html , prive css etc airbnb
      })
        .setLngLat( m.centro! ) // [n,n]
        .addTo( this.mapa ); // refre a la misma mapa - gracias a referencia local



      this.marcadores.push({ // Reconstruir la coleccion action: agregar ,porque se purga al momento de refresh y destroy del componente
         marker: newMarker,   // y es el alimentador de localstorage en cada accion - la eleminacion debe ser por accion del cliente
         color: m.color
      });


      /* gracias en js los objetos trabajan por refrenecia , new marker son mis Objetos marcadores , asi al arrastrar seran los valores de ubicacion actualizado
         en el momento(por ref ) , y empujados en el array que elementa el storage asi que asi es el proceso ...
       *
      */
      //  aqui estoy sujeto a las refe de mis objetos markers
      newMarker.on('dragend', () => {//este event cuando se deja de arrastrar ese marcador se dispara
       /* escuha de event de la instancia de marcadore :
        * ver doc eventos del objeto marker y mapa explotar conocimientos
        */
       //console.log('drag')
        this.guardarMarcadoresLocalStorage();  // mantener storage actulizado de las coordenadas de cada objeto de la coleccion
      });


    });

  }



  borrarMarcador( i:number){
    /* mi array de marcadores tiene el objeto marker en posicion i que quiero eleminar
       es decir en esta coleccion existen Objetos lleva color y objeto marcador asi si tengo inedx del objeto accedo a el mismo
       asi accedo al objeto marker(que es propd e este ultimo) y ejecuta metodo remove que tiene objeto marker y se remueve la instancia objeto .
    */
    this.marcadores[i].marker?.remove();
    /* ahora bien , a la coleccion debe eleminarle objeto puesto que ya he eleminado la instancia de marker
     * y alimentar local storage de las nuevas instancias existentes
     */
    this.marcadores.splice( i, 1);
    this.guardarMarcadoresLocalStorage();

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
