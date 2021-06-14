import { Component, OnInit, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {
    this.sidenav.mode = 'over';
  }

  toggleSidenav() {
    this.sidenav.mode = 'over';
    this.sidenav.toggle();
  }
}
