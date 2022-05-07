import { Component, isDevMode, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false

  hide = true;

  email = new FormControl(undefined, [Validators.required, Validators.email]);
  password = new FormControl(undefined, [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(public auth: AuthentificationService, private router: Router, private titleService: Title, private analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    this.analytics.setCurrentScreen('LogIn')
    this.titleService.setTitle('Login | Pywol')
  }

  login() {
    this.isLoading = true
    this.auth.login(this.email.value, this.password.value).subscribe({
      next: (value: any) => {
        if (isDevMode()) {
          console.log(value)
        }
        this.auth.infoMe().subscribe({
          next: (value: any) => {
            this.isLoading = false;
            if (isDevMode()) {
              console.log(value)
            }
            this.goTo("/file-list")
          },
          error: (err: any) => this.isLoading = false
        })
      },
      error: (err: any) => { this.isLoading = false; console.error(err) }
    })
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
