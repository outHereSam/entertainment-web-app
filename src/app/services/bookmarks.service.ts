import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Media } from '../state/media/media.state';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  bookmarks$ = new BehaviorSubject<Media[]>([]);

  constructor() {
    const localStorageBookmarks = localStorage.getItem('bookmarks');
    if (localStorageBookmarks) {
      this.bookmarks$.next(JSON.parse(localStorageBookmarks) as Media[]);
    }
  }

  getBookmarkedMedia() {
    return this.bookmarks$;
  }

  findBookmark(media: Media) {
    return this.bookmarks$.value.some((item) => item.title === media.title);
  }

  toggleBookmark(media: Media) {
    // console.log(media);
    const currentBookmarks = this.bookmarks$.value;
    if (this.findBookmark(media)) {
      const updatedBookmarks = currentBookmarks.filter(
        (item) => item.title !== media.title
      );
      this.bookmarks$.next(updatedBookmarks);
    } else {
      this.bookmarks$.next([...currentBookmarks, media]);
    }
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks$.value));
  }
}
