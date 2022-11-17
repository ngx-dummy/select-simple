/*!
 * @ngx-dummy/select-Simple library
 * Simple select created for angular / ionic projects.
 * https://github.com/ngx-dummy/select-simple
 *
 * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>
 * Published under MIT License
 */
import { SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IOption, ISelectItem } from './models';

export const imgBase64ToBlob = (Base64Image: string, imageType = 'image/png') => {
	const parts = Base64Image.split(';base64,');
	const decodedData = window.atob(parts[1]);
	const uInt8Array = new Uint8Array(decodedData.length);
	for (let i = 0; i < decodedData.length; ++i) {
		uInt8Array[i] = decodedData.charCodeAt(i);
	}
	return new Blob([uInt8Array], { type: imageType });
};

export const svgToBase64src = (rawSvg: string) => 'data:image/svg+xml;base64,' + btoa(rawSvg);
export const prepRes = (item: string, sanitizer: DomSanitizer) => sanitizer.bypassSecurityTrustResourceUrl(item);
export const sanitizeHTML = (item: string, sanitizer: DomSanitizer) => sanitizer.sanitize(SecurityContext.HTML, item);
export const getSvgSafeRes = (file: string, sanitizer: DomSanitizer) => prepRes(svgToBase64src(file), sanitizer);
export const getPngSafeRes = (file: string, sanitizer: DomSanitizer) => prepRes(URL.createObjectURL(imgBase64ToBlob(file)), sanitizer);
export const blobToSafeRes = (blob: Blob, sanitizer: DomSanitizer) => prepRes(URL.createObjectURL(blob), sanitizer);

/**
 *
 * @param data - option value (could be simple string or complex object to resolve)
 * @param field - the key (or complex lookup object key) of data object to resolve value by
 * @returns resolved single option value (Input for SelectItem)
 */
export const resolveFieldData = (data: IOption, field?: string): string | null => {
	if (isEmpty(data)) return null;
	if (isString(data)) return data;
	if (isSelectItem(data)) {
		if (data['label']) return data['label'];
		if (data['value']) data = data['value'];
	}

	if (field) {
		if (isString(field) && field.indexOf('.') === -1) {
			return data[field];
		} else if (isString(field)) {
			const fields: string[] = field.split('.');
			let value = data;
			for (let i = 0, len = fields.length; i < len; ++i) {
				if (value == null) {
					return null;
				}
				value = value[fields[i]];
			}
			return resolveFieldData(value);
		}
	} else {
		return resolveFieldData(Object.values(data)[0] as Record<string, string>);
	}
	return null;
};

export const isValue = <T>(obj: T): obj is T => obj !== undefined && obj !== null;
export const isEmpty = <T>(obj: T): obj is T => !isValue(obj);
export const isString = (obj: IOption): obj is string => typeof obj === 'string';
export const isObject = <T extends object | string>(obj: T): obj is T => typeof obj !== 'string' && !Array.isArray(obj) && typeof obj === 'object';
export const isSelectItem = (obj: ISelectItem | string): obj is ISelectItem => (isObject(obj) && !!(<ISelectItem>obj).value) || !!(<ISelectItem>obj).label;
export const areEqual = (obj1: IOption | null, obj2: IOption | null, field?: string): boolean => {
	if (isEmpty(obj1) || isEmpty(obj2)) return false;
	if (isString(obj1) && isString(obj2)) return obj1 === obj2;

	if (field) return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);

	return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export enum OptionKeyboardEventHandleKeys {
	ArrowDown = 'ArrowDown',
	Down = 'Down',
	ArrowUp = 'ArrowUp',
	Enter = 'Enter',
	Escape = 'Escape',
	Esc = 'Esc',
	Up = 'Up',
	Tab = 'Tab',
	Space = ' ',
}
