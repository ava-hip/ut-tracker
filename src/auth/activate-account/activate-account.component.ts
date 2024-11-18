import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {CodeInputModule} from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    RouterLink
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
  message: string = "";
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(private service: AuthService) {

  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token)
  }

  private confirmAccount(token: string) {
    this.service.confirm(token).subscribe({
      next: () => {
        this.message = "Votre compte a été activé avec succès."
        this.submitted = true
        this.isOkay = true
      },
      error: () => {
        this.message = "Le code a expiré ou est invalide."
        this.submitted = true
        this.isOkay = false
    }
    })
  }
}
