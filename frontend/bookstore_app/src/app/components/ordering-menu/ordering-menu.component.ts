import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-ordering-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ordering-menu.component.html',
  styleUrl: './ordering-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingMenuComponent {
  menuOpen = false;
  options = [
    { label: 'Рейтинг по убыванию', value: '-rating' },
    { label: 'Рейтинг по возрастанию', value: 'rating' },
    { label: 'Цена по убыванию', value: '-price' },
    { label: 'Цена по возрастанию', value: 'price' },
  ];

  selectedOption: string;

  constructor(private filterService: FilterService) {
    this.selectedOption = this.filterService.getFilters().ordering || this.options[0].value;
  }

  ngOnInit() { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: any) {
    this.selectedOption = option.value;
    this.menuOpen = false;
    this.filterService.setParameter('ordering', this.selectedOption);
  }
}
