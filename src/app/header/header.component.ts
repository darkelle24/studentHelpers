import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  test() {
    console.log('work')
  }

}
