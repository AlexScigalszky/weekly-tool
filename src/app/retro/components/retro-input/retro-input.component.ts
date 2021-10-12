import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-retro-input',
  templateUrl: './retro-input.component.html',
  styleUrls: ['./retro-input.component.scss'],
})
export class RetroInputComponent {
  @Output() onSubmited = new EventEmitter<string>();
  model: string = '';
  emit() {
    const text = this.model;
    this.model = '';
    this.onSubmited.emit(text);
  }
}
