import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent { 
  @Input() rating!: number;

  get fullStars(): number[] {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars(): number[] {
    return Array(5 - Math.floor(this.rating)).fill(0);
  }
}
