import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() disabled = false;
  @Output() onInput = new EventEmitter();

  inputEvent(e: any) {
    this.onInput.emit(e.target.value);
  }

}
