import {  Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

export interface MenuOptions{
  icon: string;
  lable: string;
  route: string;
  subLable: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [
    RouterLink,RouterLinkActive
  ],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  gifService = inject (GifService)

  menuOptions:MenuOptions[] = [
    {
      icon:'fa-solid fa-chart-line',
      lable: 'Trending',
      subLable: 'Popular Gifs',
      route: '/dashboard/trending',
    },
    {
      icon:'fa-solid fa-magnifying-glass',
      lable: 'Search',
      subLable: 'Serch Gifs',
      route: '/dashboard/search',
    },
  ]

}
