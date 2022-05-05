import { Component, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InfoTypeInterface } from 'src/app/core/_models/infoTypeInterface';
import { ApiService } from 'src/app/core/_services/api.service';

@Component({
  selector: 'app-info-type',
  templateUrl: './info-type.component.html',
  styleUrls: ['./info-type.component.scss']
})
export class InfoTypeComponent implements OnInit {

  list: any[] = [
  ]

  filteredList: any[] = []

  searchBarValue: string | undefined = undefined

  selectedType: string = 'Tous'

  types: string[] = []

  isLoading: boolean = true

  constructor(private router: Router, private api: ApiService, private titleService: Title) { }

  ngOnInit(): void {
    this.getAllInfos()
    this.titleService.setTitle('Pywol')
  }

  public goTo(info: any) {
    console.log(info)
    this.router.navigate(['infoType', info.goTo, info.idType], { queryParams: { goTo: info.title }, queryParamsHandling: null });
  }

  getAllInfos() {
    this.api.getInfos().subscribe({
      next: (values: any[]) => {
        let toShow: any[] = []

        if (isDevMode()) {
          console.log(values)
        }

        values.forEach((value: any) => {
          let toReturn: InfoTypeInterface = {
            goTo: value.topic.name,
            image: "",
            priority: value.priority,
            type: value.topic.name,
            title: value.title,
            content: "",
            typeColor: value.topic.color,
            idType: value.topic.id
          }

          toShow.push(toReturn)
        })

        this.list = toShow

        if (isDevMode()) {
          console.log(toShow)
        }

        this.getAllType()
        this.filter()

        this.isLoading = false
      },
      error: (err: any) => {
        this.isLoading = false
      }
    })
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
