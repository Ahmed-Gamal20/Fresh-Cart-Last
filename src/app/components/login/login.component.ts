import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router)

  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess:boolean=false;


//   loginForm: FormGroup=this._FormBuilder.group({
//   name:[null , [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(15),
//         ]],
//   email:[null , [Validators.required, Validators.email]],
//   password:[null , [
//           Validators.required,
//           Validators.pattern(/^\w{6,}$/),
//         ]],
//   rePassword:[null],
//   phone:[null, , [
//           Validators.required,
//           Validators.pattern(/^01[0125][0-9]{8}$/),
//         ]],

// }, {Validators:this.confirmPassword})





loginForm: FormGroup = new FormGroup(
    {

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),


    }
  );


  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          // navigate to login page
          this.msgSuccess=true;
if(res.message=='success'){
setTimeout(()=>{

  //sava token
  localStorage.setItem('userToken',res.token)
  // decode token
this._AuthService.saveUserData()
//navigate
  this._Router.navigate(['/home'])
},2000)

}
          this.isLoading = false;

        },
        error: (err) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoading = false;
        },
      });
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
