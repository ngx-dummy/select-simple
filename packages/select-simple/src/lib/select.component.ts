import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	NgZone,
	OnChanges,
	Output,
	Provider,
	QueryList,
	Renderer2,
	SimpleChanges,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
	ViewRef,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { SelectItemComponent } from './select-item.component';
import { areEqual, getSvgSafeRes, isString, OptionKeyboardEventHandleKeys, resolveFieldData } from './settings/helpers';
import { BasicStylesSet, IOption, IOptionClickEvent, ISelectItem, ITemplates } from './settings/models';
import { arrow_down } from './theming/icons-base';

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
		'[class]': 'styleClass',
		'[style]': 'headerStyle',
		'[class.wrapper-focus]': 'focused || overlayVisible',
		'[class.select]': 'true',
		'[class.disabled]': 'disabled',
		'[class.focus]': 'focused || overlayVisible',
		'[class.select-open]': 'overlayVisible',
		'[attr.tabIndex]': 'tabindex',
		'[attr.autofocus]': 'autofocus',
		'[attr.name]': 'name',
		'(blur)': 'onHostBlur($event)',
		'(focus)': 'onHostFocus($event)',
		'(keydown)': 'onKeydown($event)',
		'(click)': 'onMouseclick($event)',
	},
})
export class SelectComponent implements AfterViewInit, OnChanges, ControlValueAccessor {
	@ViewChild('defaultSelectIconTmpl', { read: TemplateRef }) defaultOpenerTemplate: TemplateRef<HTMLElement> | undefined;
	@ViewChild('itemsListDefaultTmpl', { read: TemplateRef }) itemsListDefaultTmpl: TemplateRef<HTMLElement> | undefined;
	@ContentChildren(SelectItemComponent, { descendants: true }) projectedItems: QueryList<SelectItemComponent> | undefined;
	@Input() templates: ITemplates | undefined;
	@Input() name: string | null = null;

	/** set additional custom classList to the Select component's panel   */
	@Input() panelStyleClass = 'panel';
	/** set additional custom classList to the Select component   */
	@Input() styleClass = '';
	@Input() readonly = false;
	@Input() required = false;
	/** whether to display reset button in the end of the options   */
	@Input() resetBtn = false;
	/** whether to display search field */
	@Input() searchField = false;
	/** whether to set auto focus to component */
	@Input() autofocus = false;
	/** default component caption (panel caption) */
	@Input() placeholder?: string = undefined;
	/** string key of the Options input (in case of complex object) of kind: 'key' / 'key.subkey'...  if set, would resolve the options' captions */
	@Input() optionLabelKey?: string | undefined = undefined;
	@Input() selectIconClass = '';
	@Input() tabindex = 0;
	@Input() itemSize: number | undefined;
	@Output() onChange: EventEmitter<any> = new EventEmitter();
	@Output() onClick: EventEmitter<any> = new EventEmitter();
	@Output() onShow: EventEmitter<boolean> = new EventEmitter();
	@Output() onHide: EventEmitter<boolean> = new EventEmitter();
	@Output() onFocus: EventEmitter<any> = new EventEmitter();
	@Output() onBlur: EventEmitter<any> = new EventEmitter();

	openerBtnTemplate: TemplateRef<HTMLElement> | undefined;
	itemslistTemplate: TemplateRef<HTMLElement> | undefined;
	trigger_icon = getSvgSafeRes(arrow_down, this.sanitizer);

	private _headerStyle = {};
	private _options: IOption[] = [];
	private _disabled = false;
	private _panelStyle: any = {
		backgroundColor: 'rgba(1, 1, 1, 0.45)',
		color: '#fff',
		border: '1px solid var(--ngxd-primary-color)',
		borderRadius: '0.2rem',
		boxShadow: '2px 5px 10px rgba(55, 55, 55, 0.8)',
	};

	itemTemplate: TemplateRef<HTMLElement> | undefined;
	selectedItemTemplate: TemplateRef<HTMLElement> | null = null;
	selectedOption: ISelectItem | string | null = null;
	selectedItemIndex = 0;
	optionsToDisplay?: any[] = [];
	hover = false;
	overlayVisible = false;
	optionsChanged = false;
	focused = false;
	panel: HTMLDivElement | undefined;
	prevValue: any;
	value: any;
	onModelChange: (...args: unknown[]) => unknown = () => void 0;
	onModelTouched: () => void = () => void 0;
	// optionsToDisplay?: ISelectItem<unknown>[] | Array<Record<string, unknown>> | string[];

	onHostFocus() {
		console.log('Focus, prev value :: ', this.prevValue);
	}
	onHostBlur() {
		this.prevValue = this.selectedOption || null;
		console.log('BLUR, prev val :: ', this.prevValue);
	}

	/**
	 * @property
	 * @param {BasicStylesSet} headStyleObj - styles to override the defaults of Select component panel
	 */
	@Input() set headerStyle(headStyleObj: BasicStylesSet) {
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

	@Input() set panelStyle(stylesObj: BasicStylesSet) {
		if (!!stylesObj && !!Object.keys(stylesObj).length) {
			this._panelStyle = {
				...this._panelStyle,
				...stylesObj,
			};
		}
	}
	get panelStyle() {
		return this._panelStyle;
	}

	@Input() get options(): IOption[] {
		return this._options;
	}
	set options(val: IOption[]) {
		this._options = val;
		this.optionsToDisplay = this._options;
		this.updateSelectedOption();
	}

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

	constructor(
		// @Self() @Optional() ngControl: NgControl,
		public el: ElementRef<Element>,
		public renderer: Renderer2,
		public cd: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		public zone: NgZone
	) {
		// if (ngControl) {
		//   ngControl.valueAccessor = this;
		// }
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.entries(changes).forEach(([changeKey, change]) => {
			if (changeKey === 'templates') {
				// if (change.currentValue === change.previousValue) return;
				// if (!change.isFirstChange()) return;

				this.openerBtnTemplate = change.currentValue['openerBtnTemplate'];
				this.itemsListDefaultTmpl = change.currentValue['itemslistTemplate'];
				this.cd.markForCheck();
			}
		});
	}

	ngAfterViewInit() {
		this.openerBtnTemplate = this.templates?.openerBtnTemplate ? this.templates.openerBtnTemplate : this.defaultOpenerTemplate;
		this.itemsListDefaultTmpl = this.templates?.itemslistTemplate ? this.templates.itemslistTemplate : this.itemsListDefaultTmpl;
		if (this.templates?.selectedItemTemplate) {
			this.selectedItemTemplate = this.templates.selectedItemTemplate;
		}

		this.projectedItems?.forEach((itemCmp) => {
			itemCmp.optionClick.subscribe((e) => this.onItemClick(e));
		});

		fromEvent<MouseEvent>(document, 'click')
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
		this.updateSelectedOption();
	}

	onInputFocus($event: Event) {
		this.focused = true;
		this.onFocus.emit($event);
	}

	onInputBlur($event: Event) {
		this.focused = false;
		this.onBlur.emit($event);
	}

	get label() {
		return this.selectedOption
			? this.getOptionLabel(this.selectedOption)
			: this.placeholder?.length
			? this.placeholder
			: this.options?.length
			? this.getOptionLabel(this.options[0])
			: null;
	}

	getOptionLabel(option: IOption) {
		return resolveFieldData(option, this.optionLabelKey);
	}

	getOptionValue(option: IOption | null): string | null {
		if (!option) return null;
		return resolveFieldData(option);
	}

	isOptionDisabled(option: ISelectItem | string): boolean {
		return isString(option) ? false : !!option?.disabled || false;
	}

	onItemClick({ option, baseEvent }: IOptionClickEvent) {
		if (this.readonly) {
			console.log('DropDown is READONLY');
			return;
		}

		if (!option) return;

		if (!this.isOptionDisabled(option)) {
			this.selectItem(baseEvent, option);
		}

		setTimeout(() => {
			this.hide();
		}, 150);
	}

	selectItem($event: Event, option: string | ISelectItem | null, update = true) {
		// if (this.selectedOption != option) {
		this.selectedOption = option;

		if (update) {
			this.value = this.getOptionValue(option);
			this.onModelChange(this.value);
			this.onChange.emit({
				originalEvent: $event,
				value: this.value,
			});
		}
		// }
	}

	writeValue(value: any) {
		this.value = value;
		this.updateSelectedOption();
		this.cd.markForCheck();
	}

	validate({ value }: AbstractControl) {
		if (this.required && !value) return { invalid: true };
		const isNotValid = this.required && !value && !!Validators.required(value);
		return (
			isNotValid && {
				invalid: true,
			}
		);
	}

	updateSelectedOption() {
		// this.selectedOption = this.findOption(val, this.optionsToDisplay);
		if (!this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
			this.selectedOption = this.optionsToDisplay[0];
		}
	}

	registerOnChange(fn: (...args: unknown[]) => unknown) {
		this.onModelChange = fn;
	}

	registerOnTouched(fn: (...args: unknown[]) => unknown) {
		this.onModelTouched = fn;
	}

	setDisabledState(val: boolean) {
		this.disabled = val;
		this.cd.markForCheck();
	}

	onMouseclick($event: Event) {
		if (this.disabled) {
			return;
		}
		if (!this.readonly) {
			this.onClick.emit($event);
		}

		if (this.overlayVisible) this.hide();
		else this.show();

		this.cd.detectChanges();
	}

	reset() {
		this.selectItem(new MouseEvent('click'), null);
	}

	isOutsideClicked(event: Event): boolean {
		return !(this.el.nativeElement.isSameNode(event.target as Node) || this.el.nativeElement.contains(event.target as Node));
	}

	show() {
		this.overlayVisible = true;
		this.onShow.emit(true);
		if (this.searchField && !!this.options?.length) {
			setTimeout(() => {
				const searchFieldInputEl = this.el.nativeElement?.querySelector('.search-term') as HTMLInputElement;
				searchFieldInputEl?.focus();

				!!searchFieldInputEl &&
					fromEvent<InputEvent>(searchFieldInputEl, 'input')
						.pipe(
							takeUntil(this.onHide),
							debounceTime(200),
							switchMap(($event) => of((<HTMLInputElement>$event.target).value))
						)
						.subscribe(
							(searchTerm) =>
								(this.optionsToDisplay = searchTerm.length
									? this.options?.filter((opt) => {
											const optionValue = this.getOptionValue(opt);
											const found = !!optionValue?.toLowerCase().includes(searchTerm.toLowerCase());
											return found;
									  })
									: this.options)
						);
			});
		}
	}

	hide() {
		this.onHide.emit(false);
		this.overlayVisible = false;
		this.optionsToDisplay = this.options;
		this.cd.markForCheck();
	}

	onKeydown($event: KeyboardEvent) {
		if (this.isOutsideClicked($event)) {
			console.log('Clicked outside of the component ...');
			return;
		}

		if (this.readonly || !this.optionsToDisplay?.length) {
			return;
		}

		switch ($event.key) {
			case OptionKeyboardEventHandleKeys.ArrowDown:
			case OptionKeyboardEventHandleKeys.Down: {
				if (!this.overlayVisible && $event.altKey) {
					this.show();
				} else {
					this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
					const nextEnabledOption = this.findNextEnabledOption(this.selectedItemIndex);
					if (nextEnabledOption) {
						this.selectItem($event, nextEnabledOption, false);
					}
				}
				$event.preventDefault();
				break;
			}
			case OptionKeyboardEventHandleKeys.ArrowUp:
			case OptionKeyboardEventHandleKeys.Up: {
				this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this.optionsToDisplay) : -1;
				const prevEnabledOption = this.findPrevEnabledOption(this.selectedItemIndex);
				if (prevEnabledOption) {
					this.selectItem($event, prevEnabledOption, false);
				}
				$event.preventDefault();
				break;
			}
			case OptionKeyboardEventHandleKeys.Space: {
				if (!this.overlayVisible) {
					this.show();
				} else {
					this.hide();
				}
				$event.preventDefault();
				break;
			}
			case OptionKeyboardEventHandleKeys.Enter: {
				this.hide();
				this.prevValue = this.selectedOption;
				this.selectItem($event, this.selectedOption, true);
				$event.preventDefault();
				break;
			}
			case OptionKeyboardEventHandleKeys.Escape:
			case OptionKeyboardEventHandleKeys.Esc: {
				this.selectItem($event, this.prevValue);
				this.hide();
				$event.preventDefault();
				break;
			}
			case OptionKeyboardEventHandleKeys.Tab: {
				this.hide();
				break;
			}
		}
	}

	findOptionIndex(val: string | null, opts: IOption[]): number {
		if (!val?.trim().length) return -1;
		if (!opts?.length) return -1;

		let index = -1;
		for (let i = 0; i < opts.length; i++) {
			if (areEqual(val, this.getOptionValue(opts[i]))) {
				index = i;
				break;
			}
		}
		return index;
	}

	findPrevEnabledOption(index: number) {
		let prevEnabledOption;

		if (this.optionsToDisplay && this.optionsToDisplay.length) {
			for (let i = index - 1; 0 <= i; i--) {
				const option = this.optionsToDisplay[i];
				if (option.disabled) {
					continue;
				} else {
					prevEnabledOption = option;
					break;
				}
			}

			if (!prevEnabledOption) {
				for (let i = this.optionsToDisplay.length - 1; i >= index; i--) {
					const option = this.optionsToDisplay[i];
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

	findNextEnabledOption(index: number) {
		let nextEnabledOption;

		if (this.optionsToDisplay && this.optionsToDisplay.length) {
			for (let i = index + 1; i < this.optionsToDisplay.length; i++) {
				const option = this.optionsToDisplay[i];
				if (this.isOptionDisabled(option)) {
					continue;
				} else {
					nextEnabledOption = option;
					break;
				}
			}

			if (!nextEnabledOption) {
				for (let i = 0; i < index; i++) {
					const option = this.optionsToDisplay[i];
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
