import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-success-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './order-success-dialog.component.html',
  styleUrl: './order-success-dialog.component.scss'
})
export class OrderSuccessDialogComponent { }


