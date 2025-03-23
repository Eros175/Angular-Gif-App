import { Component } from '@angular/core';
import { GifsSideMenuComponent } from "../../components/gifs-side-menu/gifs-side-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    GifsSideMenuComponent,
    RouterOutlet
],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent { }
