import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {map, Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../../common/models/player';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgOptimizedImage,
    UpperCasePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  players$: Observable<Player[]>;
  positions: string[] = ["DG", "DC", "DD", "MC", "AG", "AD", "BU"];
  form = new FormGroup({
    imgLink: new FormControl(""),
    position: new FormControl(""),
    goal: new FormControl(0),
    assist: new FormControl(0),
    team: new FormGroup({
      id: new FormControl(0)
    })
  })

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.players$ = route.data.pipe(map(({players}) => players))
  }

  addPlayer():void {
    this.form.patchValue({
      team: {
        id: this.route.snapshot.params['id']
      }
    })
    if (this.form.valid) {
      this.http.post<Player>("/player", this.form.getRawValue()).subscribe()
    }
  }

  deletePlayer(id: number) {
    this.players$ = this.http.delete("/player/" + id).pipe(
      switchMap(() =>
        this.http.get<Player[]>('/player'))
    )
  }
}
