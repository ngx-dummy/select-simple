/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

export interface ISelectItem<T = any> {
	label?: string;
	value: T;
	styleClass?: string;
	icon?: string;
	title?: string;
	disabled?: boolean;
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
			[ngStyle]="{ height: itemSize + 'px' }"
			[ngClass]="{
				'select-item': true,
				'item-highlight': selected,
				'item-disabled': disabled
			}"
		>
			<span *ngIf="!template">{{ label || 'empty' }}</span>
			<ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
		</li>
	`,
})
export class SelectItemComponent {
	@Input() option: string | ISelectItem;
	@Input() selected: boolean;
	@Input() label?: string;
	@Input() disabled?: boolean;
	@Input() visible?: boolean;
	@Input() itemSize?: number;
	@Input() template?: TemplateRef<HTMLElement>;
	@Output() onClick: EventEmitter<{ originalEvent: MouseEvent; option: string | ISelectItem }> = new EventEmitter();

	onOptionClick(event: MouseEvent) {
		this.onClick.emit({
			originalEvent: event,
			option: this.option as ISelectItem,
		});
	}
}
