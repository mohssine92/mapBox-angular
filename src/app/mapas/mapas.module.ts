import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* Router rutas hijas
 * trae importado el modul de router lo cual habilita todo componets relacionados con router y systema de routas
   navigacion etc ... routeroutle , router link  , redirect etc ..
*/
import { MapasRoutingModule } from './mapas-routing.module';

//componentes pages
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';

//componentes
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';



@NgModule({
  declarations: [
    MiniMapaComponent,
    FullScreenComponent,
    MarcadoresComponent,
    ZoomRangeComponent,
    PropiedadesComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule
  ]
})
export class MapasModule { }
