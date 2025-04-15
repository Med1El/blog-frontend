import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { AuthService } from '../../../services/auth.service';
import { WrongCredentialsComponent } from '../../wrong-credentials/wrong-credentials.component';
import { MustMatch } from '../../../helpers/must-match.helper';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get f() { return this.signupForm.controls; }


  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.username?.value, this.email?.value, this.password?.value).subscribe({
        next: (res: any) => {
          this.dialog.open(WrongCredentialsComponent, {
            data: { 'errorMsg': 'Registration Was Succesful' }
          });
          this.router.navigateByUrl('login');
        },
        error: (error) => {
          //error.error.message
          //error.error.error.code
          if (error.error.error.code === 11000) {
            console.log(error);
            this.dialog.open(WrongCredentialsComponent, {
              data: { 'errorMsg': error.error.message + ': \n ' + Object.keys(error.error.error.keyValue) + ' \'' + Object.values(error.error.error.keyValue) + '\' already exists' }
            });
          }

        }
      });
    } else {
      this.signupForm.markAllAsTouched(); // show errors if submit clicked with invalid fields
    }
  }
}

