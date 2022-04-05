import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-type',
  templateUrl: './info-type.component.html',
  styleUrls: ['./info-type.component.scss']
})
export class InfoTypeComponent implements OnInit {

  list: any[] = [
    { goTo: "Money", image: '../../assets/png-clipart-dollar-dollar.png', title: "Financement", subtitle: "Bourse - Travail", content: "Rubrique contenant tous les infos par rapport aux financements." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', title: "Logement", subtitle: "Logement - Cout de la vie", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
  ]

  value = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(info: any) {
    this.router.navigate(['infoType', info.goTo]);
  }

}
