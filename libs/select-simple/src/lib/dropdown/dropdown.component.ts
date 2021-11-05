/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-duplicate-case */
/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/template/eqeqeq */
/* eslint-disable @angular-eslint/template/eqeqeq */
/* eslint-disable @angular-eslint/template/eqeqeq */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
  , ViewRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, of, switchMap } from 'rxjs';

import { ObjectUtils } from './Utils';

export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'ngxd-dropdown',
  template: `
       <div #container [ngClass]="{'dropdown component':true, 'item-disabled':disabled, 'dropdown-open':overlayVisible }"
          (click)="onMouseclick($event)" [ngStyle]="style" [class]="styleClass">
          <span *ngIf="(label !== null)" >
              <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
              <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
          </span>
          <span [ngClass]="{'dropdown-label placeholder':true,'dropdown-label-empty': (placeholder === null || placeholder.length === 0)}" *ngIf=" (label === null)">{{placeholder||'empty'}}</span>
          <div class="dropdown-trigger" role="button" [attr.aria-expanded]="overlayVisible">
            <ng-container *ngIf="dropBtnTemplate; else defaultDropIconTmpl"></ng-container>
          </div>
          <div *ngIf="overlayVisible" [ngClass]="'dropdown-panel component'"  [ngStyle]="panelStyle" [class]="panelStyleClass">
              <div class="dropdown-items-wrapper" >
                  <ul class="dropdown-items">
                      <ng-container>
                          <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                      </ng-container>
                      <ng-template #itemslist let-options let-selectedOption="selectedOption">
                          <ng-container >
                              <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                  <ngxd-dropdown-item 
                                    [option]="option" 
                                    [selected]="selectedOption === option" 
                                    [label]="getOptionLabel(option)" 
                                    [disabled]="isOptionDisabled(option)"
                                    (onClick)="onItemClick($event)"
                                    [template]="itemTemplate"
                                    [itemSize]="itemSize"
                                    ></ngxd-dropdown-item>
                              </ng-template>
                          </ng-container>
                      </ng-template>
                  </ul>
              </div>
          </div>
      </div>

      <ng-template #defaultDropIconTmpl>
          <span class="dropdown-trigger-icon" [ngClass]="dropdownIconClass" *ngIf="!overlayVisible">
            <ion-icon class="btn-chevron" name="chevron-down-outline"></ion-icon>
          </span>
          <span class="dropdown-trigger-icon" [ngClass]="dropdownIconClass" *ngIf="overlayVisible">
            <ion-icon class="btn-chevron" name="chevron-up-outline"></ion-icon>
          </span>
      </ng-template>
  `,
  providers: [DROPDOWN_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() dropBtnTemplate: TemplateRef<any> = undefined;
  @Input() name: string;
  @Input() style: any;
  @Input() panelStyle: any;
  @Input() styleClass: string;
  @Input() panelStyleClass: string;
  @Input() readonly: boolean;
  @Input() placeholder: string;
  @Input() optionLabel: string;
  @Input() dropdownIconClass: string;
  @Input() optionValue: string;

  @Input() optionDisabled: string;
  @Input() itemSize: number;
  @Input() get options(): any[] {
    return this._options;
  }
  set options(val: any[]) {
    this._options = val;
    this.optionsToDisplay = this._options;
    this.updateSelectedOption(this.value);
    this.optionsChanged = true;
  }

  private _disabled: boolean;
  @Input() get disabled(): boolean {
    return this._disabled;
  };
  set disabled(_disabled: boolean) {
    if (_disabled) {

      if (this.overlayVisible)
        this.hide();
    }

    this._disabled = _disabled;
    if (!(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges();
    }
  }

  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter();

  overlay: HTMLDivElement;
  itemTemplate: TemplateRef<any>;
  selectedItemTemplate: TemplateRef<any>;
  selectedOption: any;
  _options: any[];

  value: any;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  optionsToDisplay: any[];

  hover: boolean;

  // focused: boolean;

  overlayVisible: boolean;

  optionsChanged: boolean;

  panel: HTMLDivElement;

  selectedOptionUpdated: boolean;

  constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone) { }

  ngAfterContentInit() {

  }

  ngOnInit() {
    this.optionsToDisplay = this.options;
    this.updateSelectedOption(null);

    fromEvent(document, 'click').pipe(
      switchMap(ev => {
        const iconContainer = (<HTMLElement>ev.target)?.classList?.contains('dropdown-trigger-icon');

        if (this.isOutsideClicked(ev) && !iconContainer) {
          ev.preventDefault();
          this.hide();
        }
        return of(ev);
      })
    ).subscribe();
  }


  get label(): string {
    return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
  }

  getOptionLabel(option: any) {
    return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
  }

  getOptionValue(option: any) {
    return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (this.optionLabel || option.value === undefined ? option : option.value);
  }

  isOptionDisabled(option: any) {
    return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
  }

  onItemClick(event) {
    const option = event.option;

    if (!this.isOptionDisabled(option)) {
      this.selectItem(event, option);
      // this.accessibleViewChild.nativeElement.focus();
    }

    setTimeout(() => {
      this.hide();
    }, 150);
  }

  selectItem(event, option) {
    if (this.selectedOption != option) {
      this.selectedOption = option;
      this.value = this.getOptionValue(option);

      this.onModelChange(this.value);
      this.onChange.emit({
        originalEvent: event.originalEvent,
        value: this.value
      });
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOption(value);
    this.cd.markForCheck();
  }

  updateSelectedOption(val: any): void {
    // this.selectedOption = this.findOption(val, this.optionsToDisplay);
    if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
      this.selectedOption = this.optionsToDisplay[0];
    }
    this.selectedOptionUpdated = true;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  };

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  };

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.cd.markForCheck();
  };

  onMouseclick(event) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.onClick.emit(event);
    // this.accessibleViewChild.nativeElement.focus();

    if (this.overlayVisible)
      this.hide();
    else
      this.show();

    this.cd.detectChanges();
  }

  isOutsideClicked(event: Event): boolean {
    return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(<Node>event.target)));
  }

  show() {
    this.overlayVisible = true;
    this.onShow.emit(true);
  }

  hide() {
    this.onHide.emit(false);
    this.overlayVisible = false;
    this.cd.markForCheck();
  }

}
