import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthorizeService } from "./authorize.service";
import { ApplicationPaths, QueryParameterNames } from './api-authorization.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeWindowsGroupGuardGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
                                                                          Promise<boolean | UrlTree> |
                                                                          boolean |
                                                                          UrlTree {
    return this.authorize.getUser().pipe(map((u: any) => !!u && !!u.hasUsersGroup)).pipe(tap((isAuthorized: boolean) => this.handleAuthorization(isAuthorized, state)));;
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    if (!isAuthenticated) {
      window.location.href = "/Identity/Account/Login?" + QueryParameterNames.ReturnUrl + "=/";
    }
  }
}
