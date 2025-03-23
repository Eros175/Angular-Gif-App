//imports Angular
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

//imports form page
import { environment } from '@enviroments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';


const GIF_KEY = 'gifs';

const loadFormLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}


@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([])

  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif [][] >(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3){
      groups.push( this.trendingGifs().slice(i, i + 3))
    };

    return groups;
  })

  searchHistory = signal<Record<string,Gif[]>>(loadFormLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendigGifs();
  }

  saveGifsTolocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString)
  })

  loadTrendigGifs() {

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      },
    })
    .subscribe( (resp) => {

     const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
     this.trendingGifs.update(currentgifs => [...currentgifs,...gifs]);
     this.trendingPage.update(currentPage => currentPage +1)
     this.trendingGifsLoading.set(false);

    });
  }


  searchGifs( query :string ): Observable<Gif[]> {
   return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        q: query,
      },
    })
    .pipe(
      map( ({data}) => data),
      map( (items) => GifMapper.mapGiphyItemToGifArray(items)),

      //Historial
      tap( items => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLocaleLowerCase()]: items,
        }))
      })
    );


    // .subscribe( (resp) => {
    //  const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);

    //  console.log({search: gifs});

    // });

  }

  getHistoryGifs(query: string):Gif[]{
    return this.searchHistory()[query] ?? []
  }

  //new features copy to clip board

  copyUrlToClipBoard(url: string) {
    navigator.clipboard.writeText(url)
    alert('The URL was copied to the clipboard')
  }
}
