/* eslint-disable @angular-eslint/no-host-metadata-property */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { IOption, IOptionClickEvent } from './settings/models';

@Component({
	selector: 'ngxd-select-item',
	styles: [
		`
			:host {
				display: block;
				padding: 0.1rem;
				.item-disabled {
					cursor: not-allowed !important;
					pointer-events: none;
					color: var(--ngxd-disabled);
					user-select: none;
				}

				.item-highlight:not(.item-disabled) {
					user-select: none;
					cursor: pointer;
					pointer-events: all;
				}
			}
		`,
	],
	template: `
		<ng-container *ngIf="template; else simpleItemTmpl">
			<ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
		</ng-container>
		<ng-template #simpleItemTmpl>{{ caption }}</ng-template>
	`,
	host: {
		'[attr.role]': '"option"',
		'[attr.disabled]': 'disabled',
		'[ngStyle]': '{ "height": "height", "visibility": "visibility", "background-color": "itemBg", "color": "color" }',
		'[class.select-item]': 'true',
		'[class.item-highlight]': 'selected',
		'[class.item-disabled]': 'disabled',
		'[ngClass]': 'option?.styleClass',
		'(click)': 'onOptionClick($event)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectItemComponent implements OnChanges {
	@Input() option: IOption = undefined;
	@Input() selected = false;
	@Input() disabled = false;
	@Input() visible = true;
	@Input() itemBg = 'transparent';
	@Input() color = '#ddd';
	@Input() itemSize: number | undefined = 25;
	@Input() label: string | null = null;
	@Input() template?: TemplateRef<HTMLElement>;
	@Output() optionClick: EventEmitter<IOptionClickEvent> = new EventEmitter();

	height = '100%';
	visibility = 'hidden';
	caption = 'Empty';

	ngOnChanges(changes: SimpleChanges) {
		Object.entries(changes).forEach(([changeKey, changeVal]) => {
			if (changeVal.currentValue === changeVal.previousValue) return;

			if (changeKey === 'itemSize') {
				this.height = (typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize) ?? '100%';
			}
			if (changeKey === 'visible') {
				this.visibility = this.visible ? 'visible' : 'hidden';
			}
			if (changeKey === 'option' || changeKey === 'label') {
				this.caption = this.label?.trim().length ? this.label : 'Empty';
			}
		});
	}

	onOptionClick($event: MouseEvent) {
		this.optionClick.emit({
			baseEvent: $event,
			option: this.option ?? (this.label || 'Nothing selected'),
		});
	}
}
