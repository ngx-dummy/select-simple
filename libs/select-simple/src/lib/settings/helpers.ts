/* eslint-disable @typescript-eslint/no-explicit-any */
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
export const resolveFieldData = (data: { [x: string]: any; } | string, field?: string) => {
	if (typeof data === 'string')
		return data;

	if (!!data && !!field) {
		if (isString(field) && field.indexOf('.') == -1) {
			return data[field];
		} else {
			if (isString(field)) {
				const fields: string[] = field.split('.');
				let value = data;
				for (let i = 0, len = fields.length; i < len; ++i) {
					if (value == null) {
						return null;
					}
					value = value[fields[i]];
				}
				return value;
			}
		}
	} else if (data) {

		if (!!data && !!data['label'])
			return data['label'];

		else {
			return Object.values(data)[0] || null;
		}
	} else
		return null;

};

export const isString = (obj: any): obj is string => typeof obj === 'string';
export const equals = (obj1: any, obj2: any, field?: string): boolean => {
	if (field) return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);
	else return JSON.stringify(obj1) === JSON.stringify(obj2);
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
	Space = ' '
}