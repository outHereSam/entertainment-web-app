import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [NavbarComponent, SearchbarComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.sass',
})
export class BookmarksComponent {}
