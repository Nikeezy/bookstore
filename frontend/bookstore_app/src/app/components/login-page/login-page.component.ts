import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent { 
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        window.location.reload();
    });
  }
}
