import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../core/_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<void>();

  constructor(public auth: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  openCloseMenu() {
    this.closeMenu.emit()
  }

}
