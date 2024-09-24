import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Media } from '../../state/media/media.state';
import {
  selectAllMediaItems,
  selectFilteredMediaItems,
} from '../../state/media/media.selectors';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../state/app.state';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [AsyncPipe, NavbarComponent],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.sass',
})
export class MediaListComponent {
  filteredMediaItems$!: Observable<Media[]>;
  category: string | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.filteredMediaItems$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.category = params.get('category');
        console.log(this.category);
        return this.store.select(selectFilteredMediaItems(this.category)); // Ensure this selector accesses the right data
      })
    );
    // console.log(this.category);
  }
}
