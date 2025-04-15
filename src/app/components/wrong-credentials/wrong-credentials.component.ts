import { Component, Inject, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wrong-credentials',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './wrong-credentials.component.html',
  styleUrl: './wrong-credentials.component.css'
})
export class WrongCredentialsComponent {

  readonly dialogRef = inject(MatDialogRef<WrongCredentialsComponent>);
  readonly msg = inject<{ 'errorMsg': string }>(MAT_DIALOG_DATA);

  processedErrorMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.processedErrorMessage = this.data.errorMsg.replace(/\n/g, '<br><br>');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
