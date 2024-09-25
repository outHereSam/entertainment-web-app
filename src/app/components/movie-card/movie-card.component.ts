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

  isBookmarked: boolean = false;

  constructor(protected bookmarksService: BookmarksService) {}

  ngOnInit() {
    this.isBookmarked = this.bookmarksService.findBookmark(this.movie);

    this.bookmarksService.getBookmarkedMedia().subscribe((bookmarkedMedia) => {
      this.isBookmarked = bookmarkedMedia.some(
        (item) => item.title === this.movie.title
      );
    });
  }

  onBookmarkClick() {
    // console.log(this.movie);
    this.bookmarksService.toggleBookmark(this.movie);
  }
}
