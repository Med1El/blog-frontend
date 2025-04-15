import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { AuthService } from '../../../services/auth.service';
import { WrongCredentialsComponent } from '../../wrong-credentials/wrong-credentials.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.email?.value, this.password?.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('blogs');
        },
        error: (error) => {
          if (error.status === 401) {
            this.dialog.open(WrongCredentialsComponent, {
              data: { 'errorMsg': 'Wrong Credentials' }
            });
          }
          else {
            this.dialog.open(WrongCredentialsComponent, {
              data: { 'errorMsg': error.message }
            });
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched(); // show errors if submit clicked with invalid fields
    }
  }
}
