import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  constructor() {}

  ngOnInit() {}

  handleClickMenu() {
    if (this.sidenav.mode === 'over') this.sidenav.close();
  }
}
