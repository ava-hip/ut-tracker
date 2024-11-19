import { Component } from '@angular/core';
import {AuthService} from '../../../../auth/auth.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-toggle-account',
  standalone: true,
  imports: [],
  templateUrl: './toggle-account.component.html',
  styleUrl: './toggle-account.component.css'
})
export class ToggleAccountComponent {
  user: User | undefined;
  isHidden: boolean;
  constructor(protected authService: AuthService) {
    this.user = authService.currentUser
    this.isHidden = true;
  }

  toggleAccount() {
    this.isHidden = !this.isHidden;
  }
}
