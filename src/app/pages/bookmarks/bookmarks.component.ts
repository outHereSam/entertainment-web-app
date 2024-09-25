import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { BookmarksService } from '../../services/bookmarks.service';
import { Observable } from 'rxjs';
import { Media } from '../../state/media/media.state';
import { AsyncPipe } from '@angular/common';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [NavbarComponent, SearchbarComponent, AsyncPipe, MovieCardComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.sass',
})
export class BookmarksComponent {
  bookmarks$: Observable<Media[]>;

  constructor(private bookmarksService: BookmarksService) {
    this.bookmarks$ = this.bookmarksService.getBookmarkedMedia();
  }

  ngOnInit() {}
}
