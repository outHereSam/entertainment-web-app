import { Component } from '@angular/core';
import { debounceTime, fromEvent, map, switchMap, tap } from 'rxjs';
import { setSearchItem } from '../../state/media/media.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.sass',
})
export class SearchbarComponent {
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
        tap((query) =>
          this.store.dispatch(setSearchItem({ searchItem: query }))
        )
      )
      .subscribe();
  }
}
