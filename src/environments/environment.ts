import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export let arraySongs:any=[];
export const environment={
  firebase: {
    projectId: 'spotify-32974',
    appId: '1:548716744653:web:5a21afd37a00651e6abe84',
    databaseURL: 'https://spotify-32974-default-rtdb.firebaseio.com',
    storageBucket: 'spotify-32974.appspot.com',
    apiKey: 'AIzaSyC0WNU8-hbJDZLIKUu7_D9k6EYJgdkGoTk',
    authDomain: 'spotify-32974.firebaseapp.com',
    messagingSenderId: '548716744653',
  },
    url:'https://spotify-32974-default-rtdb.firebaseio.com/'
};


export let passwordsDontMatch=false;
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