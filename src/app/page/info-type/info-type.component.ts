import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-type',
  templateUrl: './info-type.component.html',
  styleUrls: ['./info-type.component.scss']
})
export class InfoTypeComponent implements OnInit {

  list: any[] = [
    { goTo: "Money", image: '../../assets/png-clipart-dollar-dollar.png', title: "Financement", typeColor: "rgba(59, 130, 246, 1)", type: "Finance", content: "Rubrique contenant tous les infos par rapport aux financements." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', typeColor: "rgba(34, 197, 94, 1)", type: "Logement", title: "Logement", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', typeColor: "rgba(34, 197, 94, 1)", type: "Logement", title: "Logement", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', typeColor: "rgba(34, 197, 94, 1)", type: "Logement", title: "Logement", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', typeColor: "rgba(34, 197, 94, 1)", type: "Logement", title: "Logement", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
    { goTo: "Housing", image: 'http://assets.stickpng.com/images/588a6686d06f6719692a2d1a.png', typeColor: "rgba(34, 197, 94, 1)", type: "Logement", title: "Logement", content: "Rubrique contenant tous les infos par rapport aux logement et cout de la vie." },
  ]

  filteredList: any[] = []

  searchBarValue: string | undefined = undefined

  selectedType: string = 'Tous'

  types: string[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getAllType()
    this.filteredList = this.list
  }

  public goTo(info: any) {
    this.router.navigate(['infoType', info.goTo]);
  }

  getAllType(): void {
    this.list.forEach(element => {
      if (!this.types.find((obj) => obj === element.type)) {
        this.types.push(element.type)
      }
    });
  }

  filter() {
    if (this.selectedType !== 'Tous') {
      this.filteredList = this.list.filter((value) => this.selectedType === value.type)
    } else {
      this.filteredList = this.list
    }
    if (this.searchBarValue !== '' && this.searchBarValue !== undefined) {
      this.filteredList = this.filteredList.filter((value) => value.title.includes(this.searchBarValue) || value.content.includes(this.searchBarValue))
    }
  }

}
