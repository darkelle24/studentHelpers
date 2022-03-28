import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  list: any[] = [
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
  ]
  panelOpenState: boolean = false
  panelOpenState1: boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(info: any) {
    this.router.navigate(['infoType', info.goTo]);
  }

  goToWindow(link: string) {
    window.open(link, "_blank")
  }

}
