import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-type',
  templateUrl: './info-type.component.html',
  styleUrls: ['./info-type.component.scss']
})
export class InfoTypeComponent implements OnInit {

  list: any[] = [{ goTo: "Money" }]

  value = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(info: any) {
    this.router.navigate(['infoType', info.goTo]);
  }

}
