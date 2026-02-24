import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PizzaItem } from '../../models/pizza-item.model';
import { PizzaCardComponent } from './pizza-card.component';

@Component({
    selector: 'app-catalog',
    imports: [PizzaCardComponent],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent {
    readonly pizzas = input.required<PizzaItem[]>();
    readonly openImage = output<PizzaItem>();

    protected onOpenImage(item: PizzaItem): void {
        this.openImage.emit(item);
    }
}

