import { Component, Input } from '@angular/core';
import { Media } from '../../state/media/media.state';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.sass',
})
export class MovieCardComponent {
  @Input() movie!: Media;
  @Input() isTrending!: boolean;

  constructor(protected bookmarksService: BookmarksService) {}

  ngOnInit() {}

  onBookmarkClick() {
    // console.log(this.movie);
    this.bookmarksService.toggleBookmark(this.movie);
  }
}
