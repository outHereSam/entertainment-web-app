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
    return this.bookmarks$.value.includes(media);
  }

  toggleBookmark(media: Media) {
    // console.log(media);
    if (this.bookmarks$.value.includes(media)) {
      this.bookmarks$.next(
        this.bookmarks$.value.filter((item) => item !== media)
      );
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks$.value));
    } else {
      this.bookmarks$.next([...this.bookmarks$.value, media]);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks$.value));
    }
  }
}
