import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl<string>("", {nonNullable: true}),
    email: new FormControl<string>("", {nonNullable: true}),
    password: new FormControl<string>("", {nonNullable: true})
  }, {validators: [Validators.required]})


  constructor(private service: AuthService, private router: Router) {
  }

  register() {
    if (this.form.valid) {
      this.service.register(this.form.getRawValue())
        .subscribe({
          next: () => {
            this.router.navigate(['activate-account'])
          },
          error: (err) => {
            console.log(err)
          }
        })
    }
  }
}
