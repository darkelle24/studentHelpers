import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallerie-bar',
  templateUrl: './gallerie-bar.component.html',
  styleUrls: ['./gallerie-bar.component.scss']
})
export class GallerieBarComponent implements OnInit, OnDestroy {

  selected: number = 0

  listBar: any[] = [
    { image: '../../../../../assets/bar.jpg', title: 'Bruxelle Bar1', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: '../../../../../assets/bar.jpg', title: 'Bruxelle Bar2', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: '../../../../../assets/bar.jpg', title: 'Bruxelle Bar3', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: '../../../../../assets/bar.jpg', title: 'Bruxelle Bar4', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' }
  ]

  countdownIntervale: any

  constructor() { }

  ngOnInit(): void {
    this.countdown()
  }

  ngOnDestroy(): void {
    this.destroyTimer()
  }

  destroyTimer() {
    if (this.countdownIntervale) {
      clearInterval(this.countdownIntervale)
      this.countdownIntervale = undefined
    }
  }

  countdown() {
    this.countdownIntervale = setInterval(() => {
      this.next()
    }, 4000)
  }

  prev() {
    this.selected = this.selected - 1
    if (this.selected < 0) {
      this.selected = this.listBar.length - 1
    }
  }

  next() {
    this.selected = this.selected + 1
    if (this.listBar.length <= this.selected) {
      this.selected = 0
    }
  }

}
