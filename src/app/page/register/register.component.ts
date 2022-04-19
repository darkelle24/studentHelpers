import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/_services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading: boolean = false

  hide = true;

  constructor(public auth: AuthentificationService, private router: Router) { }

  password = new FormControl(undefined, [Validators.required]);
  email = new FormControl(undefined, [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

  register() {
    this.isLoading = true
    this.auth.register(this.email.value, this.password.value).subscribe({
      next: (value: any) => {
        if (isDevMode()) {
          console.log(value)
        }
        this.auth.login(this.email.value, this.password.value).subscribe({
          next: (loginValue: any) => {
            if (isDevMode()) {
              console.log(loginValue)
            }
            this.auth.infoMe().subscribe({
              next: (value: any) => {
                this.isLoading = false;
                if (isDevMode()) {
                  console.log(value)
                }
                this.goTo("/infoType")
              },
              error: (err: any) => this.isLoading = false
            })
          },
          error: (err: any) => this.isLoading = false
        })
      },
      error: (err: any) => this.isLoading = false
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
