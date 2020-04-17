import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { of, BehaviorSubject } from "rxjs";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService implements CanActivate {
  rootUrl = "http://119.82.97.217:9091/equalitylabs";
  //rootUrl = "http://localhost:8080/equalitylabs";

  constructor(private httpClient: HttpClient, private router: Router) {}
  signedin$ = new BehaviorSubject(false);
  loggedinUser$ = new BehaviorSubject({});

  emailRegistered = (email: string) => {
    return this.httpClient
      .post(this.rootUrl + "/checkemail", { email: email })
      .pipe(
        map((value: any) => {
          if (value.emailRegistered === true) {
            return value;
          } else {
            return null;
          }
        }),
        catchError(err => {
          if (!err.status) {
            return of({ networkStatus: "Disconnected" });
          } else {
            return of({ unknownError: true });
          }
        })
      );
  };

  registerUser = (user: any) => {
    return this.httpClient.post(this.rootUrl + "/register", user, {
      withCredentials: true
    });
  };

  login = (user: any) => {
    return this.httpClient.post(this.rootUrl + "/login", user).pipe(
      tap(response => {
        this.signedin$.next(true);
        this.loggedinUser$.next(response);
      })
    );
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (!this.signedin$.value) {
      if(state.url === '/trustmark'){
        this.router.navigate(["/plans"]);
      }else {
        this.router.navigate(["/login"], {
          queryParams: { redirect: state.url }
        });
      }

    }
    return this.signedin$.value;
  }
}
