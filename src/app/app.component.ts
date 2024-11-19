import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from '../common/components/sidebar/navigation/navigation.component';
import {SidebarComponent} from '../common/components/sidebar/sidebar.component';
import {AuthService} from '../auth/auth.service';
import {NgClass} from '@angular/common';
import {MainComponent} from '../main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, SidebarComponent, NgClass, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fcchampiontracker';
  constructor(protected authService: AuthService) {
  }
}
