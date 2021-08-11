import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapasApp';
  /* este es mi componnete principal es decir es el primero que se ejecuta antes de cualquier componnete de la app
   * es lugar pefecto para ejecutar acces token a mapBox , asi evito de la obligacion de ejecutar el access token en cada componente de
   * 307 - accesstoken de forma Global
   * acces token paraque mi app de angular puede comunicar con mapBox  y me renderiza la map
   * cualquier cosa la ejecutamos en este componente se va a ejecutar antes de cualquier componente
   */
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }




}
