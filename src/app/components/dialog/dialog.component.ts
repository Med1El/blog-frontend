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
  // readonly msg = inject<{ 'message': string }>(MAT_DIALOG_DATA);

  processedMessage: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (typeof (this.data.message) === 'string' && this.data.message.includes('\n'))
      this.processedMessage = this.data.message.replace(/\n/g, '<br><br>');
    else {
      this.processedMessage = data.message;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
