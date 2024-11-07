import {ActivatedRouteSnapshot, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';

export const routes: Routes = [
  {
    path: "teams",
    loadComponent: () => import("../teams/teams.component").then(m => m.TeamsComponent),
    data: {
      display: 'teams'
    },
    resolve: {
      teams: () => inject(HttpClient).get("/team")
    }
  },
  {
    path: "teams/:id",
    loadComponent: () => import("../teams/team/team.component").then(m => m.TeamComponent),
    data: {
      display: 'team'
    },
    resolve: {
      players: (route: ActivatedRouteSnapshot) => {
        const id = +(route.paramMap.get("id") ?? 0);
        return id ? inject(HttpClient).get("/player/team/" + id).pipe(catchError(() => of(undefined)))
          : undefined
      },
    }
  },
];
