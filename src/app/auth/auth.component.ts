import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.error = null;
        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signUp(email, password);
        }

        authObs
            .subscribe(
                responseData => {
                    this.isLoading = false;
                    this.router.navigate(['/recipes']);
                    console.log(responseData)
                },
                (errorRes) => {
                    this.isLoading = false;
                    this.error = errorRes;
                }
            );
        form.reset;
    }
    onHandleError() { 
        this.error = null;
    }
}