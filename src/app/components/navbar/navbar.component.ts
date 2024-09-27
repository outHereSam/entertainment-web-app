import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  isMenuOpened: boolean = false;

  constructor(protected authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
