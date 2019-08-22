import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.page.html',
    styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {

    constructor(private router: Router) {
    }

    mobileBind() {
        this.router.navigate(['/binding']);
    }
}
