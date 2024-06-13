import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {}
