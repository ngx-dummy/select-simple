/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, Input, TemplateRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export interface ISelectItem<T = unknown> {
	label?: string;
	value: T;
	styleClass?: string;
	icon?: string;
	title?: string;
	disabled?: boolean;
}
export interface IOptionClickEvent {
	originalEvent: MouseEvent;
	option: string | ISelectItem;
}

@Component({
	selector: 'ngxd-select-item',
	styles: [`
		:host {
			display: block;
			padding: .1rem;

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
	`],
	template: `
		<span *ngIf="!template">{{ getItemCaption() }}</span>
		<ng-container *ngIf="template">
			<ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
		</ng-container>
	`,
	host: {
		'[attr.role]': '"option"',
		'[ngStyle]': '{  "height": "getItemHeight()", "visibility": "getItemVisibility()", "background-color": "itemBg" }',
		'[class.select-item]': 'true',
		'[class.item-highlight]': 'selected',
		'[class.item-disabled]': 'disabled',
		'(click)': 'onOptionClick($event)'
	},
})
export class SelectItemComponent {
	@Input() option: string | ISelectItem | undefined = undefined;
	@Input() selected = false;
	@Input() disabled = false;
	@Input() visible = true;
	@Input() itemBg = 'transparent';
	@Input() itemSize: number | undefined = 25;
	@Input() label?: string = undefined;
	@Input() template?: TemplateRef<HTMLElement>;
	@Output() optionClick: EventEmitter<IOptionClickEvent> = new EventEmitter();

	getItemCaption = () => (!!this.option && typeof this.option === 'string' ? this.option : (!!this.label?.trim && this.label?.trim().length) ? this.label : 'Empty');
	getItemHeight = () => (typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize);
	getItemVisibility = () => (this.visible ? 'visible' : 'hidden');
	onOptionClick($event: MouseEvent) {
		this.optionClick.emit({
			originalEvent: $event,
			option: this.option as ISelectItem | string,
		});
	}
}
