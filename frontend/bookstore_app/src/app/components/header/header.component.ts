import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HeaderComponent {
  isLoggedIn = false;
  user?: User;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: data => this.user = data,
      error: error => error,
    });
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh');

    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe(
        () => {
          localStorage.clear();
          window.location.reload();
        }
      )
    }
  }
}
