import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// componnetes pages
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';




const routes: Routes = [
   // esta es manera de usar lazyload
  {
    path: '', // lo que sistema de routas principal me de va ser este path
    children: [
      { path: 'fullscreen',  component: FullScreenComponent },
      { path: 'zoom-range',  component: ZoomRangeComponent },
      { path: 'marcadores',  component: MarcadoresComponent },
      { path: 'propiedades', component: PropiedadesComponent },
      { path: '**', redirectTo: 'fullscreen' },
    ]
  }

];





/* detecta automaticly de que no se trata de modul principal asi nos genero la funcion de un router de routas hijas forchild()
 *
 *
*/
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
