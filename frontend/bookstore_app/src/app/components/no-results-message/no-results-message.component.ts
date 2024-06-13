import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-results-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './no-results-message.component.html',
  styleUrl: './no-results-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoResultsMessageComponent {
  @Input() isSingle: boolean = false;
}
