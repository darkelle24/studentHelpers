import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  constructor(public analytics: AngularFireAnalytics) { }

  ngOnInit(): void {
    this.analytics.setCurrentScreen('Share')
  }

  getUrl(): string {
    return window.location.href
  }

  opened(social: any) {
    this.analytics.logEvent('share', {
      method: social
    });
  }

}
