import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-order-section',
    imports: [ReactiveFormsModule, NgOptimizedImage],
    templateUrl: './order-section.component.html',
    styleUrl: './order-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSectionComponent {
    readonly orderForm = input.required<FormGroup>();
    readonly isSubmitting = input(false);
    readonly submitOrder = output<void>();

    protected preventDot(event: KeyboardEvent): void {
        if (event.key === '.') {
            event.preventDefault();
        }
    }

    protected sanitizeName(): void {
        const control = this.orderForm().get('name');
        const value = String(control?.value ?? '');
        const sanitized = value.replace(/\./g, '');

        if (control && sanitized !== value) {
            control.setValue(sanitized);
        }
    }

    protected onSubmit(): void {
        this.submitOrder.emit();
    }
}

