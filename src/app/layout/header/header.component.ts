import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareComponent } from 'src/app/page/share/share.component';
import { AuthentificationService } from '../../core/_services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<void>();

  constructor(public auth: AuthentificationService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  openCloseMenu() {
    this.closeMenu.emit()
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShareComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
