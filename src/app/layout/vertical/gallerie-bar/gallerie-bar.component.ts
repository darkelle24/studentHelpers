import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallerie-bar',
  templateUrl: './gallerie-bar.component.html',
  styleUrls: ['./gallerie-bar.component.scss'],
  animations: [
    trigger('first', [
      transition('none => prev', [
        style({ opacity: 0, transform: 'translateX(0%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('second', [
      transition('none => prev', [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
      transition('none => next', [
        style({ opacity: 1, transform: 'translateX(0%)' }),
        animate('300ms', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('third', [
      state('prev', style({
        opacity: 0
      })),
      transition('none => next', [
        style({ opacity: 0, transform: 'translateX(0%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(-100%)' })),
      ]),
    ]),
  ]
})
export class GallerieBarComponent implements OnInit, OnDestroy {

  selected: number = 0

  listBar: any[] = [
    { image: '../../../../../assets/bar.jpg', title: 'Bruxelle Bar1', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: 'https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg', title: 'Bruxelle Bar2', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg', title: 'Bruxelle Bar3', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', siteWeb: 'https://www.bardugaspi.com/', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' },
    { image: 'https://media.istockphoto.com/photos/colorful-background-of-pastel-powder-explosionrainbow-color-dust-on-picture-id1180542165?k=20&m=1180542165&s=612x612&w=0&h=43hlhk8qdGYP4V-u3AAxD3kPDRIzHjMNWpr-VdBQ2Js=', title: 'Bruxelle Bar4', description: 'Puzzles coffee shop is one of the finest coffee shops in central downtown in New York. It\'s quiet; far away from busy streets and never ending constructions.', position: 'https://www.google.com/maps?q=Bar+du+Gaspi&rlz=1C1CHBF_frFR935FR935&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiwmfinnMf3AhWFPOwKHWyZB60Q_AUoAXoECAIQAw' }
  ]

  first: any = undefined
  second: any = undefined
  third: any = undefined

  sense: string = 'none'

  countdownIntervale: any

  constructor() { }

  ngOnInit(): void {
    this.initPlace()

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
    if (this.sense === 'none') {
      if (this.selected - 1 < 0) {
        this.sense = 'prev'
        this.selected = this.listBar.length - 1
      } else {
        this.sense = 'prev'
        this.selected = this.selected - 1
      }
    }
  }

  next() {
    if (this.sense === 'none') {
      if (this.listBar.length <= this.selected + 1) {
        this.sense = 'next'
        this.selected = 0
      } else {
        this.sense = 'next'
        this.selected = this.selected + 1
      }
    }
  }

  initPlace() {
    this.second = this.listBar[this.selected]

    if (this.selected - 1 < 0) {
      this.first = this.listBar[this.listBar.length - 1]
    } else {
      this.first = this.listBar[this.selected - 1]
    }

    if (this.listBar.length <= this.selected + 1) {
      this.third = this.listBar[0]
    } else {
      this.third = this.listBar[this.selected + 1]
    }
  }

  onAnimationEventDone(event: any) {
    this.initPlace()
    this.sense = 'none'
  }

}
