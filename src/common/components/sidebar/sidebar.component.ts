import { Component } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';
import {ToggleAccountComponent} from './toggle-account/toggle-account.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NavigationComponent,
    ToggleAccountComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
