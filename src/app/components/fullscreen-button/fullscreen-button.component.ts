import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-fullscreen-button',
  templateUrl: './fullscreen-button.component.html',
  styleUrls: ['./fullscreen-button.component.scss'],
})
export class FullscreenButtonComponent implements OnInit {
  elem: any;
  isFullScreen: boolean = false;
  id = 'selected-topic';

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    this.chkScreenMode();
    const elem = document.getElementById(this.id);
    this.elem = elem ? elem : this.elem;
    console.log('this.elem', this.elem);
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  fullscreenmodes() {
    this.chkScreenMode();
  }
  chkScreenMode() {
    var newValueOfFullScreen = document?.fullscreenElement;
    if (newValueOfFullScreen) {
      if (newValueOfFullScreen) {
        this.isFullScreen = true;
      } else {
        this.isFullScreen = false;
      }
    }
  }
  openFullscreen() {
    this.isFullScreen = true;
    try {
      if (this.elem) {
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
      }
    } catch (error: any) {
      console.log(`cannot open fullscreen properly`, error);
    }
  }

  closeFullscreen() {
    try {
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
    } catch (error: any) {
      console.log(`cannot close fullscreen properly`, error);
    }
    this.isFullScreen = false;
  }
}
