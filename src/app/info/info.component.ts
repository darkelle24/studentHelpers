import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  list: any[] = [{ goTo: "Money" }]
  list2: any[] = [{ goTo: "Money" }, { goTo: "Money" }]
  panelOpenState: boolean = false
  panelOpenState1: boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(info: any) {
    this.router.navigate(['infoType', info.goTo]);
  }

}
