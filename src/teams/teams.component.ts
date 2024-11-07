import {Component} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {Teams} from '../common/models/team';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AsyncPipe, DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teams$: Observable<Teams[]>;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.teams$ = route.data.pipe(map(({teams}) => teams))
  }

  delete(id: number) {
    this.teams$ = this.http.delete("/team/" + id).pipe(
      switchMap(() =>
        this.http.get<Teams[]>('/team'))
      )
  }
}
