import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PizzaItem } from '../../models/pizza-item.model';

@Component({
    selector: 'app-pizza-card',
    imports: [NgOptimizedImage],
    templateUrl: './pizza-card.component.html',
    styleUrl: './pizza-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaCardComponent {
    readonly pizza = input.required<PizzaItem>();
    readonly openImage = output<PizzaItem>();

    protected onOpenImage(): void {
        this.openImage.emit(this.pizza());
    }
}
