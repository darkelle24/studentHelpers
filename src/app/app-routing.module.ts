import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { InfoTypeComponent } from './info-type/info-type.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: 'country', component: CountryComponent },
  { path: ':country/city', component: CityComponent },
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
