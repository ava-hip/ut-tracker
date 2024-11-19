import {ActivatedRouteSnapshot, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';
import {authGuard, AuthService} from '../auth/auth.service';

export const routes: Routes = [
  {
    path: "", pathMatch: "full", redirectTo: "/login"
  },
  {
    path: "register",
    loadComponent: () => import("../auth/register/register.component").then(m => m.RegisterComponent),
  },
  {
    path: "login",
    loadComponent: () => import("../auth/login/login.component").then(m => m.LoginComponent),
  },
  {
    path: "activate-account",
    loadComponent: () => import("../auth/activate-account/activate-account.component").then(m => m.ActivateAccountComponent),
  },
  {
    path: "home",
    loadComponent: () => import("../home/home.component").then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: "teams",
    loadComponent: () => import("../teams/teams.component").then(m => m.TeamsComponent),
    data: {
      display: 'teams'
    },
    resolve: {
      teams: () => inject(HttpClient).get("/team/all/" + inject(AuthService).currentUser?.email)
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
    },
  },
  // todo : add 404
  {path: "**", redirectTo: ""},
];
