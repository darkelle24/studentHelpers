import { Component, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from './core/_services/api.service';
import { TopicsService } from './core/_services/topics.service';
import { ShareComponent } from './page/share/share.component';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public topics: TopicsService, analytics: AngularFireAnalytics) {
    this.topics.actualizeTopics()
    analytics.setAnalyticsCollectionEnabled(true)
    analytics.logEvent('user_load_web_site');
    /* if (!isDevMode())
      analytics.setAnalyticsCollectionEnabled(true)
    else {
      analytics.setAnalyticsCollectionEnabled(false)
    } */
  }

}
