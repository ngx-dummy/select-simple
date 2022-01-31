/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, Input, TemplateRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ISelectItem, IOptionClickEvent } from './settings/models';

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
		<ng-container *ngIf="template; else simpleItemTmpl">
			<ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
		</ng-container>
		<ng-template #simpleItemTmpl>{{ getItemCaption() }}</ng-template>
	`,
	host: {
		'[attr.role]': '"option"',
		'[attr.disabled]': 'disabled',
		'[ngStyle]': '{ "height": "getItemHeight()", "visibility": "getItemVisibility()", "background-color": "itemBg", "color": "color" }',
		'[class.select-item]': 'true',
		'[class.item-highlight]': 'selected',
		'[class.item-disabled]': 'disabled',
		'[ngClass]': 'option?.styleClass',
		'(click)': 'onOptionClick($event)'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectItemComponent {
	@Input() option: string | ISelectItem | undefined = undefined;
	@Input() selected = false;
	@Input() disabled = false;
	@Input() visible = true;
	@Input() itemBg = 'transparent';
	@Input() color = '#ddd';
	@Input() itemSize: number | undefined = 25;
	@Input() label: string | null = null;
	@Input() template?: TemplateRef<HTMLElement>;
	@Output() optionClick: EventEmitter<IOptionClickEvent> = new EventEmitter();

	getItemCaption = () => (!!this.option && typeof this.option === 'string' ? this.option : (!!this.label?.trim && this.label?.trim().length) ? this.label : 'Empty');
	getItemHeight = () => (typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize);
	getItemVisibility = () => (this.visible ? 'visible' : 'hidden');
	onOptionClick($event: MouseEvent) {
		this.optionClick.emit({
			baseEvent: $event,
			option: this.option ?? (this.label || 'Nothing selected'),
		});
	}
}
