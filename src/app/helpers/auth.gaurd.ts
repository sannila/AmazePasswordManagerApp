import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { HttpSerivceService } from "../services/http-serivce.service";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {
    constructor(
        private router: Router,
        private httpSerivce: HttpSerivceService
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const user = this.httpSerivce.userValue;
        if(user){
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }

    
}