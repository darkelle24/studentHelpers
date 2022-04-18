import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoTypeComponent } from './page/info-type/info-type.component';
import { InfoComponent } from './page/info/info.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'infoType', component: InfoTypeComponent },
  { path: 'infoType/:info', component: InfoComponent },

  { path: '', redirectTo: 'infoType', pathMatch: 'full' },
  { path: '**', redirectTo: 'infoType', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
