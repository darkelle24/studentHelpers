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
    { image: '../../../../../assets/delirium.jpg', title: 'Delirium', description: 'Bar avec plus de 2 000 bières, concerts le jeudi soir et objets de déco sur l\'univers de la brasserie.', siteWeb: 'https://www.deliriumvillage.com/', position: 'https://g.page/deliriumvillage?share' },
    { image: '../../../../../assets/cobra_bar-galley.jpg', title: 'Cobra bar-gallery', description: "L'intérieur chaleureux en bois combiné à de douces mélodies mélancoliques crée une bulle de détente dans laquelle vous pouvez déguster une large sélection de whiskies. Après plus de deux décennies, Cobra continue à offrir une échappatoire confortable aux rues agitées de Bruxelles.", siteWeb: 'https://www.cobrabar.be/', position: 'https://g.page/CobrabarBrussels?share' },
    { image: '../../../../../assets/bar_lianes.png', title: 'Bar Lianes', description: "Avec le Soleil à côté et le chemin de Saint-Jacques-de-Compostelle sur le pas de la porte, l'image espagnole fait fureur. Le Bar Llanes est peut-être bruxellois, mais il est aussi un peu ibérique. Comme dans un vrai pub, les huit tables sont directement opposées les unes aux autres. Quatre contre chaque mur. Dans les coins, quelques étagères discrètes et une machine à sous.", siteWeb: 'https://www.bruzz.be/bar-llanes-2011-06-24', position: 'https://goo.gl/maps/JNHzxrxSnJtWtKWc9' },
    { image: '../../../../../assets/cherry_bar.png', title: 'Cherry Bar', description: "Bar typiquement belge où il fait bon vivre.", siteWeb: 'https://www.facebook.com/cherry.bar.brussel/', position: 'https://goo.gl/maps/aJTcdGGvYd5mhtp8A' }
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
    }, 3000)
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
