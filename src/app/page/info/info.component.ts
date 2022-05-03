import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {
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
        this.title = info.info

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
            info: value.content.split('\n'),
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
      "Votre point de contact personnel doit toujours être votre établissement, car il peut vous guider et vous donner des informations supplémentaires sur les options de logement en tant qu'étudiant.",
      "Assurez-vous de les contacter dès votre admission.",
      "Si vous parvenez à trouver une place dans une résidence universitaire, les prix ne commencent qu'à partir de 200 EUR par mois. Si vous êtes intéressé par un logement étudiant privé, cela vous coûtera entre 300 et 500 EUR par mois.",
      "Dans les appartements étudiants, vous pouvez avoir votre chambre privée entièrement meublée et partager le reste des installations avec d'autres étudiants. Assurez-vous de toujours vérifier les conditions de location concernant ce qui est inclus dans le loyer avant de signer un contrat de logement étudiant.",
      "Si vous n'avez pas trouvé d'appartement étudiant avant le début de vos études, vous pouvez séjourner dans une auberge de jeunesse pendant une courte période et commencer à chercher pendant que vous vous trouvez dans le pays."
    ]
  },
  {
    name: 'Cout de vie',
    info: [
      "Vous devez dépenser entre 800 et 1 000 EUR par mois. Trouver un logement par soi-même coûte plus cher, surtout dans une ville comme Bruxelles, aux alentours de 600-800 EUR par mois. Dans les petites villes comme Gand ou Louvain, le coût est moindre pour les logements étudiants privés.",
      "Pour le transport mensuel en tant qu'étudiant en Belgique, vous ne devrez payer que 20-25 EUR avec la réduction étudiant. Les livres et le matériel d'étude vous coûteront environ 50 EUR par mois, selon le programme que vous étudiez et les dépenses du supermarché environ 300 EUR par mois.",
      "Profitez des rabais étudiants, utilisez un vélo ou même marchez jusqu'à l'université si vous le pouvez et cuisinez davantage au lieu de manger au restaurant tous les jours. Cela vous fera économiser beaucoup d'argent en Belgique que vous pourrez économiser pour un passe-temps ou un voyage !"
    ]
  }
]

const Money: any[] = [
  {
    name: "Bourse",
    info: [
      "Si tu pars de trois à douze mois dans le cadre du programme Erasmus, tu bénéficieras d’une allocation qui t’aidera à financer une partie de ton séjour. Tu peux t’attendre à recevoir entre 150 et 250 euros par mois pour un échange en Belgique. Cette allocation peut aller jusqu’à 400 euros par mois si tu effectues un stage inclut dans tes études.",
      "Si tu pars hors Erasmus, sache que les communautés françaises et néerlandaises offrent des bourses sur critères sociaux aux citoyens européens. Renseigne-toi sur le site de la Fédération Wallonie-Bruxelles.",
      "A noter, si vous êtes boursier sur critères sociaux, vous continuez de percevoir les versements de votre bourse."
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
      "Pour travailler en Belgique, les étudiants français n’ont pas besoin d’accomplir une démarche particulière. Depuis janvier 2017, il est conseillé cependant de ne pas dépasser un contingent de 475 heures par année civile. Au-delà vous devrez payer des cotisations sociales comme tout salarié. Sous ce volume horaire, vous paierez uniquement une cotisation de solidarité (2 % maximum).",
    ],
  }
] */
