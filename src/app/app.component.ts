import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMediaItems } from './state/media/media.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'entertainment-web-app';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadMediaItems());
  }
}
