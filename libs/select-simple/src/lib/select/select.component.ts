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
	AfterContentChecked,
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	forwardRef,
	Host,
	Input,
	NgZone,
	OnInit,
	Optional,
	Output,
	Provider,
	QueryList,
	Renderer2,
	Self,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
	ViewRef,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getSvgSafeRes } from '../settings/helpers';
import { ITemplates } from '../settings/ISelectTemplate';
import { SelectItemComponent } from './select-item.component';
import { arrow_down } from '../theming/icons-base';
import { DomSanitizer } from '@angular/platform-browser';

export const SELECT_VALUE_ACCESSOR_PROVIDER: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => SelectComponent),
	multi: true,
};
export const NG_VALIDATORS_PROVIDER: Provider = {
	provide: NG_VALIDATORS,
	useExisting: forwardRef(() => SelectComponent),
	multi: true,
};

@Component({
	selector: 'ngxd-select',
	templateUrl: 'select.component.html',
	providers: [SELECT_VALUE_ACCESSOR_PROVIDER, NG_VALIDATORS_PROVIDER],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['select.component.scss'],
	host: {
		'[class.wrapper-focus]': 'focused || overlayVisible',
		'[attr.tabIndex]': 'tabindex',
		'[attr.autofocus]': 'autofocus',
		'(blur)': 'onHostBlur($event)',
		'(focus)': 'onHostFocus($event)',
		'(keydown)': 'onKeydown($event)',
	},
})
export class SelectComponent implements OnInit, AfterContentChecked, ControlValueAccessor {
	@ViewChild('defaultSelectIconTmpl', { read: TemplateRef }) defaultOpenerTemplate: TemplateRef<HTMLElement>;
	@ViewChild('itemsListDefaultTmpl', { read: TemplateRef }) itemsListDefaultTmpl: TemplateRef<HTMLElement>;
	@ContentChildren(SelectItemComponent, { descendants: true }) projectedItems: QueryList<SelectItemComponent>;

	opennerBtnTemplate: TemplateRef<HTMLElement>;
	itemslistTemplate: TemplateRef<HTMLElement>;
	trigger_icon = getSvgSafeRes(arrow_down, this.sanitizer);

	onHostFocus(_$event) {
		console.log('Focus, prev value :: ', this.prevValue);
	}
	onHostBlur(_$event) {
		this.prevValue = this.selectedOption || null;
		console.log('BLUR, prev val :: ', this.prevValue);
	}

	@Input() templates: ITemplates;
	@Input() name: string;

	_headerStyle = {};
	// Change header styles
	@Input() set headerStyle(headStyleObj: any) {
		if (!!headStyleObj && !!Object.keys(headStyleObj).length) {
			this._headerStyle = {
				...this._headerStyle,
				...headStyleObj,
			};
		}
	}
	get headerStyle() {
		return this._headerStyle;
	}

	// Default panel styling , change via the input
	_panelStyle: any = {
		backgroundColor: 'rgba(1, 1, 1, 0.45)',
		color: '#fff',
		border: '1px solid #ccd',
		borderRadius: '0.1rem',
		boxShadow: '2px 5px 10px rgba(55, 55, 55, 0.8)',
	};
	get panelStyle() {
		return this._panelStyle;
	}

	@Input() set panelStyle(stylesObj: Object) {
		if (!!stylesObj && !!Object.keys(stylesObj).length) {
			//extending the panels' stylings
			this._panelStyle = {
				...this._panelStyle,
				...stylesObj,
			};
		}
	}
	@Input() panelStyleClass = 'panel';
	@Input() styleClass: string;
	@Input() readonly = false;
	@Input() required = false;
	@Input() none = false;
	@Input() autofocus = false;
	@Input() placeholder: string;
	// IMPORTANT: Used to resolve the item name (in case the complex object provided as @Input() option` )
	@Input() optionLabelKey: string;
	@Input() selectIconClass: string;
	@Input() optionValue: string;
	@Input() tabindex = 0;

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
	}
	set disabled(_disabled: boolean) {
		if (_disabled) {
			this.focused = false;
			if (this.overlayVisible) this.hide();
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
	@Output() onFocus: EventEmitter<any> = new EventEmitter();
	@Output() onBlur: EventEmitter<any> = new EventEmitter();

	itemTemplate: TemplateRef<any>;
	selectedItemTemplate: TemplateRef<any>;
	selectedOption: any;
	_options: any[];

	prevValue: any;
	value: any;

	onModelChange: Function = () => {};

	onModelTouched: Function = () => {};

	optionsToDisplay: any[];

	hover: boolean;

	overlayVisible = false;

	optionsChanged: boolean;
	focused: boolean;

	panel: HTMLDivElement;

	constructor(
		// @Self() @Optional() ngControl: NgControl,
		public el: ElementRef,
		public renderer: Renderer2,
		public cd: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		public zone: NgZone
	) {
		// if (ngControl) {
		//   ngControl.valueAccessor = this;
		// }
	}

	ngAfterContentChecked() {
		this.opennerBtnTemplate = this.templates?.opennerBtnTemplate ? this.templates.opennerBtnTemplate : this.defaultOpenerTemplate;
		this.itemsListDefaultTmpl = this.templates?.itemslistTemplate ? this.templates.itemslistTemplate : this.itemsListDefaultTmpl;
		if (this.templates?.selectedItemTemplate) {
			this.selectedItemTemplate = this.templates.selectedItemTemplate;
		}

		this.projectedItems.forEach((itemCmp) => {
			itemCmp.onClick.subscribe((e) => this.onItemClick(e));
		});
		this.cd.detectChanges();
	}

	ngOnInit() {
		this.optionsToDisplay = this.options;
		this.updateSelectedOption(null);

		fromEvent(document, 'click')
			.pipe(
				switchMap((ev: MouseEvent) => {
					const iconContainer = (<HTMLElement>ev.target)?.classList?.contains('select-trigger-icon');

					if (this.isOutsideClicked(ev) && !iconContainer) {
						this.hide();
					}
					return of(ev);
				})
			)
			.subscribe();
	}

	onInputFocus(event) {
		this.focused = true;
		this.onFocus.emit(event);
	}

	onInputBlur(event) {
		this.focused = false;
		this.onBlur.emit(event);
	}

	get label(): string {
		const label = this.selectedOption ? this.getOptionLabel(this.selectedOption) : null;
		return label;
	}

	getOptionLabel(option: any) {
		return this.optionLabelKey ? resolveFieldData(option, this.optionLabelKey) : option.label != undefined ? option.label : option;
	}

	getOptionValue(option: any) {
		return this.optionValue ? resolveFieldData(option, this.optionValue) : this.optionLabelKey || option.value === undefined ? option : option.value;
	}

	isOptionDisabled(option: any) {
		return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : option.disabled !== undefined ? option.disabled : false;
	}

	onItemClick(event) {
		if (this.readonly) {
			console.log('DropDown is READONLY');
			return;
		}

		const option = event.option;

		if (!this.isOptionDisabled(option)) {
			this.selectItem(event, option);
		}

		setTimeout(() => {
			this.hide();
		}, 150);
	}

	selectItem(event, option, update = true) {
		// if (this.selectedOption != option) {
		this.selectedOption = option;

		if (update) {
			this.value = this.getOptionValue(option);
			this.onModelChange(this.value);
			this.onChange.emit({
				originalEvent: event?.originalEvent,
				value: this.value,
			});
		}
		// }
	}

	writeValue(value: any): void {
		this.value = value;
		this.updateSelectedOption(value);
		this.cd.markForCheck();
	}

	validate({ value }: AbstractControl) {
		if (this.required && !!!value) return { invalid: true };
		const isNotValid = this.required && !!!value && !!Validators.required(value);
		return (
			isNotValid && {
				invalid: true,
			}
		);
	}

	updateSelectedOption(val: any): void {
		// this.selectedOption = this.findOption(val, this.optionsToDisplay);
		if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
			this.selectedOption = this.optionsToDisplay[0];
		}
	}

	registerOnChange(fn: Function): void {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: Function): void {
		this.onModelTouched = fn;
	}

	setDisabledState(val: boolean): void {
		this.disabled = val;
		this.cd.markForCheck();
	}

	onMouseclick(event) {
		if (this.disabled) {
			return;
		}
		if (!this.readonly) {
			this.onClick.emit(event);
		}

		if (this.overlayVisible) this.hide();
		else this.show();

		this.cd.detectChanges();
	}

	reset() {
		this.selectItem(new MouseEvent('click'), null);
	}

	isOutsideClicked(event: Event): boolean {
		return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
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
	selectedItemIndex = 0;

	onKeydown($event: KeyboardEvent) {
		if (this.isOutsideClicked($event)) {
			console.log('Clicked outside of the component ...');
			return;
		}

		if (this.readonly || !!!this.optionsToDisplay?.length) {
			return;
		}

		switch ($event.which) {
			//down
			case 40:
				if (!this.overlayVisible && $event.altKey) {
					this.show();
				} else {
					this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
					let nextEnabledOption = this.findNextEnabledOption(this.selectedItemIndex);
					if (nextEnabledOption) {
						this.selectItem($event, nextEnabledOption, false);
					}
				}
				$event.preventDefault();
				break;

			//up
			case 38:
				this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
				let prevEnabledOption = this.findPrevEnabledOption(this.selectedItemIndex);
				if (prevEnabledOption) {
					this.selectItem($event, prevEnabledOption, false);
				}

				$event.preventDefault();
				break;

			//space
			case 32:
				if (!this.overlayVisible) {
					this.show();
				} else {
					this.hide();
				}
				$event.preventDefault();
				break;

			//enter
			case 13:
				this.hide();
				this.prevValue = this.selectedOption;
				this.selectItem($event, this.selectedOption, true);
				break;

			//escape
			case 27:
				$event.preventDefault();
				this.selectItem($event, this.prevValue);
				this.hide();
				break;

			// tab
			case 9:
				this.hide();
				break;
		}
	}

	findOptionIndex(val: any, opts: any[]): number {
		let index: number = -1;
		if (opts) {
			for (let i = 0; i < opts.length; i++) {
				if ((val == null && this.getOptionValue(opts[i]) == null) || equals(val, this.getOptionValue(opts[i]))) {
					index = i;
					break;
				}
			}
		}

		return index;
	}

	findPrevEnabledOption(index) {
		let prevEnabledOption;

		if (this.optionsToDisplay && this.optionsToDisplay.length) {
			for (let i = index - 1; 0 <= i; i--) {
				let option = this.optionsToDisplay[i];
				if (option.disabled) {
					continue;
				} else {
					prevEnabledOption = option;
					break;
				}
			}

			if (!prevEnabledOption) {
				for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
					let option = this.optionsToDisplay[i];
					if (this.isOptionDisabled(option)) {
						continue;
					} else {
						prevEnabledOption = option;
						break;
					}
				}
			}
		}

		return prevEnabledOption;
	}

	findNextEnabledOption(index) {
		let nextEnabledOption;

		if (this.optionsToDisplay && this.optionsToDisplay.length) {
			for (let i = index + 1; i < this.optionsToDisplay.length; i++) {
				let option = this.optionsToDisplay[i];
				if (this.isOptionDisabled(option)) {
					continue;
				} else {
					nextEnabledOption = option;
					break;
				}
			}

			if (!nextEnabledOption) {
				for (let i = 0; i < index; i++) {
					let option = this.optionsToDisplay[i];
					if (this.isOptionDisabled(option)) {
						continue;
					} else {
						nextEnabledOption = option;
						break;
					}
				}
			}
		}

		return nextEnabledOption;
	}
}

/**
 *
 * @param data - option value (could be simple string or complex object to resolve)
 * @param field - the key (or complex lookup object key) of data object to resolve value by
 * @returns resolved single option value (Input for SelectItem)
 */
const resolveFieldData = (data: string | object, field: object | Function | string) => {
	if (data && field) {
		if (isFunction(field)) {
			return field(data);
		} else if (isString(field) && field.indexOf('.') == -1) {
			return data[field];
		} else {
			const fields: string[] = isString(field) && field.split('.');
			let value = data;
			for (let i = 0, len = fields.length; i < len; ++i) {
				if (value == null) {
					return null;
				}
				value = value[fields[i]];
			}
			return value;
		}
	} else {
		return null;
	}
};

const isFunction = (obj: any): obj is Function => !!(obj && obj.constructor && obj.call && obj.apply);
const isString = (obj: any): obj is string => typeof obj === 'string';
const equals = (obj1: any, obj2: any, field?: string): boolean => {
	if (field) return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);
	else return JSON.stringify(obj1) === JSON.stringify(obj2);
};
