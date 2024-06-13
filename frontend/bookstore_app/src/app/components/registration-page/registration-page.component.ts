import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {
  user = {
    email: '',
    first_name: '',
    last_name: '', 
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) {}

  registration(): void {
    this.authService.registration(this.user).subscribe(
      () => {
        this.router.navigate(['/login']);
    })
  }
 }
