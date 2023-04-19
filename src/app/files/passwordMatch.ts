import { AbstractControl, ValidatorFn } from "@angular/forms";

export const passwordsDontMatch=false;
export function passwordsMatchValidator():ValidatorFn{
  return(control:AbstractControl):any=>{
    const password=control.get('password')?.value 
    const confirmPassword=control.get('confirmPassword')?.value   
    if(password && confirmPassword && password!==confirmPassword){
        return {
          passwordsDontMatch: true,
        };
    }
  }
}

export function passwordsMatchValidatorOldPassword():ValidatorFn{
  return(control:AbstractControl):any=>{
    const oldpassword=control.get('oldPassword')?.value 
    const confirmPassword=control.get('confirmPassword')?.value   
    if(oldpassword && confirmPassword && oldpassword!==confirmPassword){
        return {
          passwordsDontMatch: true,
        };
    }
  }
}