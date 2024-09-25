import { Component, Input } from '@angular/core';
import { Media } from '../../state/media/media.state';

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
}
