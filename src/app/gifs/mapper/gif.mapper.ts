import { Gif } from "../interfaces/gif.interface";
import { GhiphiItem } from '../interfaces/giphy.interfaces';

export class GifMapper{

  static mapGiphyItemToGif (item: GhiphiItem): Gif{
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyItemToGifArray(items: GhiphiItem[]): Gif[]{
    return items.map(this.mapGiphyItemToGif)
  }
}
