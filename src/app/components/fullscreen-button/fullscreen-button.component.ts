import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-fullscreen-button',
  templateUrl: './fullscreen-button.component.html',
  styleUrls: ['./fullscreen-button.component.scss'],
})
export class FullscreenButtonComponent implements OnInit {
  elem: any;
  isFullScreen: boolean;

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    this.chkScreenMode();
    this.elem = document.documentElement;
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  } /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
