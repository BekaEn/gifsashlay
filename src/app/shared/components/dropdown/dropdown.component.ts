import { Component, EventEmitter, Input, Output } from '@angular/core';

interface DROPDOWN_OPTIONS {
  value: string,
  name: string
}
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() options: DROPDOWN_OPTIONS[] = []
  @Output() emitSelectedValue = new EventEmitter();


  change(value: string): void {
    this.emitSelectedValue.emit(value)
  }
}
