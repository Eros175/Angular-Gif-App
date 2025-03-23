import { Component, inject, input } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {

  gifService = inject( GifService )

  imageUrl = input.required<string>();

  copyUrl( url :string ){
    this.gifService.copyUrlToClipBoard(url)
  }

}
