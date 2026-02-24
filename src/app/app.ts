import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { ImageViewerDialogComponent } from './image-viewer-dialog.component';
import { OrderSuccessDialogComponent } from './order-success-dialog.component';
import { PizzaItem } from './models/pizza-item.model';
import { PIZZAS } from './data/pizzas.data';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { OrderSectionComponent } from './components/order-section/order-section.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatDialogModule, HeaderComponent, HeroComponent, CatalogComponent, OrderSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly dialog = inject(MatDialog);

  protected readonly pizzas = signal<PizzaItem[]>(PIZZAS);
  protected readonly isSubmitting = signal(false);

  protected readonly orderForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\-\s()]{10,20}$/)]]
  });

  protected openImage(pizza: PizzaItem): void {
    this.dialog.open(ImageViewerDialogComponent, {
      data: { src: pizza.image, name: pizza.name },
      panelClass: 'image-viewer-panel',
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
      autoFocus: false
    });
  }

  protected submitOrder(): void {
    if (this.orderForm.invalid || this.isSubmitting()) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.http.post('/api/orders', this.orderForm.getRawValue())
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.dialog.open(OrderSuccessDialogComponent, {
            maxWidth: '420px',
            width: '90vw',
            autoFocus: false
          });
          this.orderForm.reset();
        }
      });
  }
}
