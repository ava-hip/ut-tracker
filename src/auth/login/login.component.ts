import { Component } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthResponse} from './auth-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup<CredentialForm> = new FormGroup<CredentialForm>({
    email: new FormControl<string>("", {nonNullable: true}),
    password: new FormControl<string>("", {nonNullable: true})
  }, {validators: [Validators.required]})


 constructor(private service: AuthService, private router: Router) {

 }
  login() {
    if (this.form.valid) {
      this.service.login(this.form.getRawValue())
        .subscribe({
          next: (response: AuthResponse) => {
            this.service.token = <string>response.token
            this.service.users = response.users
            this.service.users = response.users
            this.router.navigate(['teams'])
          },
          error: (err) => {
            console.log(err)
          }
        })
    }
  }

}

export interface CredentialForm {
  email: FormControl<string>
  password: FormControl<string>
}
