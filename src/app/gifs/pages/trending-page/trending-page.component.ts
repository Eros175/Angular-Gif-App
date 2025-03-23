import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent implements AfterViewInit {

  //  gifs = signal( imageUrls );


   gifService = inject( GifService );

   ScrollStateService = inject( ScrollStateService )

   scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

   ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv)return;

    scrollDiv.scrollTop = this.ScrollStateService.trendigScrollState()

   }

   onScroll(event :Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv)return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHieight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHieight + 300 >= scrollHeight;
    this.ScrollStateService.trendigScrollState.set(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendigGifs();
    }
   }
   copyUrl( url :string ){
    this.gifService.copyUrlToClipBoard(url)
  }
 }
