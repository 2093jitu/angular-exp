import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BrowserNavigationGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    this.router.navigate(['/']);
                    return false;
                }
                return true;
            })
        );
    }

}