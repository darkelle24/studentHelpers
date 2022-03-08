import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import country from '#assets/country.json'

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  list: any[] = [{}]

  value = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(info: any) {
    this.router.navigate(['/', 'users']);
  }

}
