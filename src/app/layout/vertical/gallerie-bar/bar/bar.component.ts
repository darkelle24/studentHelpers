import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() bar: any = {}

  constructor(private analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
  }

  log(log: string, url: string) {
    this.analytics.logEvent("partenaireAccess" + log, { title: this.bar.title, webSite: this.bar.siteWeb ? this.bar.siteWeb : null, position: this.bar.position })
    window.open(url, '_blank')
  }

}
