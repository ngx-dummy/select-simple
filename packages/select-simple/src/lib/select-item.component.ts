import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

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
	styles: [
		`
			:host li {
				list-style: none;
				display: flex;
				align-items: center;
			}
			.item-disabled {
				cursor: not-allowed !important;
				pointer-events: none;
				color: #16161640;
				user-select: none;
			}
			.item-highlight:not(.item-disabled) {
				user-select: none;
				cursor: pointer;
				pointer-events: all;
				background: #ccc5;
			}
		`,
	],
	template: `
		<li
			(click)="onOptionClick($event)"
			role="option"
			[ngStyle]="{ height: getItemHeight(), visibility: getItemVisibility(), 'background-color': itemBg }"
			[ngClass]="{
				'select-item': true,
				'item-highlight': selected,
				'item-disabled': disabled
			}"
		>
			<span *ngIf="!template">{{ getItemCaption() }}</span>
			<ng-container *ngIf="template">
				<ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
			</ng-container>
		</li>
	`,
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

	// To resolve caption of the item
	getItemCaption = () => (!!this.option && typeof this.option === 'string' ? this.option : (!!this.label?.trim && this.label?.trim().length) ? this.label : 'Empty');
	// To resolve height of the item
	getItemHeight = () => (typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize);
	// To resolve visibility of the item
	getItemVisibility = () => (this.visible ? 'visible' : 'hidden');

	onOptionClick($event: MouseEvent) {
		this.optionClick.emit({
			originalEvent: $event,
			option: this.option as ISelectItem | string,
		});
	}
}
