import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';

interface ImageViewerData {
  src: string;
  name: string;
}

@Component({
  selector: 'app-image-viewer-dialog',
  imports: [MatDialogModule, NgOptimizedImage],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrl: './image-viewer-dialog.component.scss'
})
export class ImageViewerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ImageViewerDialogComponent>);
  protected readonly data = inject<ImageViewerData>(MAT_DIALOG_DATA);

  protected close(): void {
    this.dialogRef.close();
  }
}
