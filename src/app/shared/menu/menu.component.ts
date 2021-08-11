import { Component, OnInit } from '@angular/core';


interface MenuItem {
  ruta: string;
  nombre: string;
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    } /* afecta solo li de este componente */
  `
  ]
})
export class MenuComponent {


  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
  ];


}
/* Menu : nos sirva para navigar a todas componentes pages que acabamos de crear
 *
 */
