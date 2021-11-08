/*!
 * @ngx-dummy/Accordion-Simple library
 * Simple accordion created for angular / ionic projects.
 * https://github.com/ngx-dummy/accordion-simple
 *
 * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>
 * Published under GNU GPLv3 License
 */
import { TemplateRef, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export const imgBase64ToBlob = (Base64Image: any, imageType = 'image/png') => {
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
export const sanitizeHTML = (item: string | object, sanitizer: DomSanitizer) => sanitizer.sanitize(SecurityContext.HTML, item);
export const getSvgSafeRes = (file: string, sanitizer: DomSanitizer) => prepRes(svgToBase64src(file), sanitizer);
export const getPngSafeRes = (file: string, sanitizer: DomSanitizer) => prepRes(URL.createObjectURL(imgBase64ToBlob(file)), sanitizer);
export const blobToSafeRes = (blob: Blob, sanitizer: DomSanitizer) => prepRes(URL.createObjectURL(blob), sanitizer);
