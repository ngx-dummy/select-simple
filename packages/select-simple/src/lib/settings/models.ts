import { TemplateRef } from '@angular/core';

export interface ITemplates {
	containerTemplate?: TemplateRef<HTMLElement>;
	selectedItemTemplate?: TemplateRef<HTMLElement>;
	openerBtnTemplate?: TemplateRef<HTMLElement>;
	itemslistTemplate?: TemplateRef<HTMLElement>;
}

export type ISelectItem<T = Record<string, string | object>> = {
	label?: string;
	value?: T;
	styleClass?: string;
	icon?: string;
	title?: string;
	disabled?: boolean;
};

export type IOption = ISelectItem | Record<string, string | object> | string | undefined;

export interface IOptionClickEvent {
	baseEvent: MouseEvent;
	option: IOption;
}

type StylesSet = {
	[K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K];
};

/**
 * @type {StylesSet} BasicStylesSet - common styles'set to be applied to header / overlay of the Select component
 */
export type BasicStylesSet = Partial<StylesSet>;
