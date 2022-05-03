import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from './core/_services/api.service';
import { TopicsService } from './core/_services/topics.service';
import { ShareComponent } from './page/share/share.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public topics: TopicsService) {
    this.topics.actualizeTopics()
  }

}
