
import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup; // Cast AbstractControl to FormGroup
        const passwordControl = formGroup.controls[controlName];
        const confirmPasswordControl = formGroup.controls[matchingControlName];

        if (!passwordControl || !confirmPasswordControl) {
            return null; // If controls are not yet defined, return null (no error)
        }

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }

        // set error on matchingControl if validation fails
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ mustMatch: true });
            return { mustMatch: true }; // Return the error object
        } else {
            confirmPasswordControl.setErrors(null);
            return null; // Return null if validation is successful
        }
    };
}