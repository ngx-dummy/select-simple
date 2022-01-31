import { TemplateRef } from '@angular/core';

export interface ITemplates {
	containerTemplate?: TemplateRef<HTMLElement>;
	selectedItemTemplate?: TemplateRef<HTMLElement>;
	openerBtnTemplate?: TemplateRef<HTMLElement>;
	itemslistTemplate?: TemplateRef<HTMLElement>;
}

export interface ISelectItem<T = unknown> {
	label?: string;
	value: T;
	styleClass?: string;
	icon?: string;
	title?: string;
	disabled?: boolean;
}
export interface IOptionClickEvent {
	baseEvent: MouseEvent;
	option: string | ISelectItem;
}