/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ngxd-dropdown-item',
  template: `
        <li (click)="onOptionClick($event)" role="option" 
            [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'dropdown-item':true, 'item-highlight': selected, 'item-disabled': disabled}">
            <span *ngIf="!template">{{label||'empty'}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `
})
export class DropdownItemComponent {
  @Input() option: SelectItem;
  @Input() selected: boolean;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() visible: boolean;
  @Input() itemSize: number;
  @Input() template: TemplateRef<any>;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onOptionClick(event: Event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option
    });
  }
}