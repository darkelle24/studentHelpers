import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfoInterface } from 'src/app/core/_models/infoInterface';
import { ApiService } from 'src/app/core/_services/api.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  title: string = ''
  list: any[] = []
  panelOpenState: boolean = false
  panelOpenState1: boolean = false

  subscribe: Subscription
  subscribeQuerry: Subscription
  getInfos: Subscription | undefined

  goTo?: string

  isLoading: boolean = true

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private titleService: Title, private analytics: AngularFireAnalytics) {
    this.subscribeQuerry = this.route.queryParams.subscribe({
      next: (info: any) => {
        if (info.goTo) {
          this.goTo = info.goTo
        } else {
          this.goTo = undefined
        }
      }
    })

    this.subscribe = this.route.params.subscribe({
      next: (info: any) => {
        this.analytics.setCurrentScreen(info.info)
        this.title = info.info

        this.titleService.setTitle(info.info + ' | Pywol')

        this.getInfo(info.info_id)
        /* if (info.info === 'Money') {
          this.title = 'Financement'
          this.list = Money
        } else if (info.info === 'Housing') {
          this.title = 'Logement'
          this.list = Housing
        } else {
          this.router.navigate(['/infoType'])
        } */
      }
    })
  }

  setQuerry(name: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { goTo: name },
        queryParamsHandling: 'merge'
      });
  }

  getInfo(title: number) {
    if (this.getInfos) {
      this.getInfos.unsubscribe()
      this.getInfos = undefined
    }

    this.isLoading = true

    this.getInfos = this.api.getInfos(title).subscribe({
      next: (values: any[]) => {
        let toShow: any[] = []

        if (isDevMode()) {
          console.log(values)
        }

        values.forEach((value: any) => {
          let toReturn: InfoInterface = {
            name: value.title,
            content: value.content,
          }

          toShow.push(toReturn)
        })

        if (isDevMode()) {
          console.log(toShow)
        }

        this.list = toShow
        if (values.length > 0) {
          this.title = values[0].topic.name
        }

        if (this.list.length > 0) {
          if (!this.goTo || !this.list.find((toTest: any) => toTest.name === this.goTo)) {
            this.setQuerry(this.list[0].name)
          }
        }

        this.isLoading = false
      },
      error: (error: any) => {
        this.isLoading = false
      }
    })
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
    this.subscribeQuerry.unsubscribe()
    if (this.getInfos) {
      this.getInfos.unsubscribe()
    }
  }

  ngOnInit(): void {
  }

  goToWindow(link: string) {
    window.open(link, "_blank")
  }

}

/* const Housing: any[] = [
  {
    name: "Logement",
    info: [
      "Votre point de contact personnel doit toujours ??tre votre ??tablissement, car il peut vous guider et vous donner des informations suppl??mentaires sur les options de logement en tant qu'??tudiant.",
      "Assurez-vous de les contacter d??s votre admission.",
      "Si vous parvenez ?? trouver une place dans une r??sidence universitaire, les prix ne commencent qu'?? partir de 200 EUR par mois. Si vous ??tes int??ress?? par un logement ??tudiant priv??, cela vous co??tera entre 300 et 500 EUR par mois.",
      "Dans les appartements ??tudiants, vous pouvez avoir votre chambre priv??e enti??rement meubl??e et partager le reste des installations avec d'autres ??tudiants. Assurez-vous de toujours v??rifier les conditions de location concernant ce qui est inclus dans le loyer avant de signer un contrat de logement ??tudiant.",
      "Si vous n'avez pas trouv?? d'appartement ??tudiant avant le d??but de vos ??tudes, vous pouvez s??journer dans une auberge de jeunesse pendant une courte p??riode et commencer ?? chercher pendant que vous vous trouvez dans le pays."
    ]
  },
  {
    name: 'Cout de vie',
    info: [
      "Vous devez d??penser entre 800 et 1 000 EUR par mois. Trouver un logement par soi-m??me co??te plus cher, surtout dans une ville comme Bruxelles, aux alentours de 600-800 EUR par mois. Dans les petites villes comme Gand ou Louvain, le co??t est moindre pour les logements ??tudiants priv??s.",
      "Pour le transport mensuel en tant qu'??tudiant en Belgique, vous ne devrez payer que 20-25 EUR avec la r??duction ??tudiant. Les livres et le mat??riel d'??tude vous co??teront environ 50 EUR par mois, selon le programme que vous ??tudiez et les d??penses du supermarch?? environ 300 EUR par mois.",
      "Profitez des rabais ??tudiants, utilisez un v??lo ou m??me marchez jusqu'?? l'universit?? si vous le pouvez et cuisinez davantage au lieu de manger au restaurant tous les jours. Cela vous fera ??conomiser beaucoup d'argent en Belgique que vous pourrez ??conomiser pour un passe-temps ou un voyage !"
    ]
  }
]

const Money: any[] = [
  {
    name: "Bourse",
    info: [
      "Si tu pars de trois ?? douze mois dans le cadre du programme Erasmus, tu b??n??ficieras d???une allocation qui t???aidera ?? financer une partie de ton s??jour. Tu peux t???attendre ?? recevoir entre 150 et 250 euros par mois pour un ??change en Belgique. Cette allocation peut aller jusqu????? 400 euros par mois si tu effectues un stage inclut dans tes ??tudes.",
      "Si tu pars hors Erasmus, sache que les communaut??s fran??aises et n??erlandaises offrent des bourses sur crit??res sociaux aux citoyens europ??ens. Renseigne-toi sur le site de la F??d??ration Wallonie-Bruxelles.",
      "A noter, si vous ??tes boursier sur crit??res sociaux, vous continuez de percevoir les versements de votre bourse."
    ],
    links: [
      {
        link: "https://www.orientation.com/bourse-erasmus-plus",
        name: "Orientation",
        subtitle: "Aide Bourse erasmus",
        imageLink: "../../assets/orientation.png",
        description: [
          "Permet de savoir si ton universiter et partenaire avec Erasmus+",
          "Permet aussi de calculer le montant de ta bourse Erasmus+"
        ]
      }
    ]
  },
  {
    name: "Travail",
    info: [
      "Pour travailler en Belgique, les ??tudiants fran??ais n???ont pas besoin d???accomplir une d??marche particuli??re. Depuis janvier 2017, il est conseill?? cependant de ne pas d??passer un contingent de 475 heures par ann??e civile. Au-del?? vous devrez payer des cotisations sociales comme tout salari??. Sous ce volume horaire, vous paierez uniquement une cotisation de solidarit?? (2 % maximum).",
    ],
  }
] */
