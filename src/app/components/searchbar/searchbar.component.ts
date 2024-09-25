import { Component, Input } from '@angular/core';
import { debounceTime, fromEvent, map, Observable, switchMap, tap } from 'rxjs';
import { setSearchItem } from '../../state/media/media.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ActivatedRoute } from '@angular/router';
import { selectSearchItem } from '../../state/media/media.selectors';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.sass',
})
export class SearchbarComponent {
  searchItem$!: Observable<string>;
  searchValue!: string;
  category: string | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category');
          return [];
        })
      )
      .subscribe();

    const searchInput = document.querySelector(
      '.search__input'
    ) as HTMLInputElement;

    fromEvent(searchInput, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        tap((query) => {
          console.log(query);
          this.store.dispatch(setSearchItem({ searchItem: query }));
        })
      )
      .subscribe();
    this.searchItem$ = this.store.select(selectSearchItem);
    this.searchItem$.subscribe((searchItem) => (this.searchValue = searchItem));
  }

  getPlaceholder() {
    if (this.category === 'movie') {
      return `Search for movies`;
    } else if (this.category === 'tv series') {
      return `Search for TV series`;
    } else if (this.category === null) {
      return 'Search for movies, tv shows, and more';
    } else {
      return 'Search for bookmarked shows/movies';
    }
  }
}
