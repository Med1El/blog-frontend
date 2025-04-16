import { Component, Inject, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly msg = inject<{ 'errorMsg': string }>(MAT_DIALOG_DATA);

  processedErrorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.processedErrorMessage = this.data.errorMsg.replace(/\n/g, '<br><br>');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
