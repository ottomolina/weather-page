import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() listPlaces: Array<Place> = [];
  @Input() disabled = false;
  @Output() onInput = new EventEmitter();
  @Output() onSelectResult = new EventEmitter();

  public showResult = false;

  inputEvent(e: any) {
    this.onInput.emit(e.target.value);
  }

  focusSearch() {
    setTimeout(() => {
      this.showResult = true;
    }, 250);
  }

  blurSearch() {
    setTimeout(() => {
      this.showResult = false;
    }, 100);
  }

  clickItemResult(itemResult: Place) {
    this.onSelectResult.emit(itemResult);
  }

}
