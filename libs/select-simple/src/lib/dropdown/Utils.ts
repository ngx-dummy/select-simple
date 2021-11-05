/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';




export class ObjectUtils {

    public static equals(obj1: any, obj2: any, field?: string): boolean {
      if (field)
        return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
      else
        return this.equalsByValue(obj1, obj2);
    }
  
    public static equalsByValue(obj1: any, obj2: any): boolean {
      if (obj1 === obj2) return true;
  
      if (obj1 && obj2 && typeof obj1 == 'object' && typeof obj2 == 'object') {
        let arrA = Array.isArray(obj1)
          , arrB = Array.isArray(obj2)
          , i
          , length
          , key;
  
        if (arrA && arrB) {
          length = obj1.length;
          if (length != obj2.length) return false;
          for (i = length; i-- !== 0;)
            if (!this.equalsByValue(obj1[i], obj2[i])) return false;
          return true;
        }
  
        if (arrA != arrB) return false;
  
        const dateA = obj1 instanceof Date
          , dateB = obj2 instanceof Date;
        if (dateA != dateB) return false;
        if (dateA && dateB) return obj1.getTime() == obj2.getTime();
  
        const regexpA = obj1 instanceof RegExp
          , regexpB = obj2 instanceof RegExp;
        if (regexpA != regexpB) return false;
        if (regexpA && regexpB) return obj1.toString() == obj2.toString();
  
        const keys = Object.keys(obj1);
        length = keys.length;
  
        if (length !== Object.keys(obj2).length)
          return false;
  
        for (i = length; i-- !== 0;)
          if (!Object.prototype.hasOwnProperty.call(obj2, keys[i])) return false;
  
        for (i = length; i-- !== 0;) {
          key = keys[i];
          if (!this.equalsByValue(obj1[key], obj2[key])) return false;
        }
  
        return true;
      }
  
      return obj1 !== obj1 && obj2 !== obj2;
    }
  
    public static resolveFieldData(data: any, field: any): any {
      if (data && field) {
        if (this.isFunction(field)) {
          return field(data);
        }
        else if (field.indexOf('.') == -1) {
          return data[field];
        }
        else {
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
      else {
        return null;
      }
    }
  
    public static isFunction(obj: any) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }
  
    public static reorderArray(value: any[], from: number, to: number) {
      let target: number;
      if (value && from !== to) {
        if (to >= value.length) {
          to %= value.length;
          from %= value.length;
        }
        value.splice(to, 0, value.splice(from, 1)[0]);
      }
    }
  
    public static insertIntoOrderedArray(item: any, index: number, arr: any[], sourceArr: any[]): void {
      if (arr.length > 0) {
        let injected = false;
        for (let i = 0; i < arr.length; i++) {
          const currentItemIndex = this.findIndexInList(arr[i], sourceArr);
          if (currentItemIndex > index) {
            arr.splice(i, 0, item);
            injected = true;
            break;
          }
        }
  
        if (!injected) {
          arr.push(item);
        }
      }
      else {
        arr.push(item);
      }
    }
  
    public static findIndexInList(item: any, list: any): number {
      let index: number = -1;
  
      if (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i] == item) {
            index = i;
            break;
          }
        }
      }
  
      return index;
    }
  
    public static removeAccents(str) {
      if (str && str.search(/[\xC0-\xFF]/g) > -1) {
        str = str
          .replace(/[\xC0-\xC5]/g, "A")
          .replace(/[\xC6]/g, "AE")
          .replace(/[\xC7]/g, "C")
          .replace(/[\xC8-\xCB]/g, "E")
          .replace(/[\xCC-\xCF]/g, "I")
          .replace(/[\xD0]/g, "D")
          .replace(/[\xD1]/g, "N")
          .replace(/[\xD2-\xD6\xD8]/g, "O")
          .replace(/[\xD9-\xDC]/g, "U")
          .replace(/[\xDD]/g, "Y")
          .replace(/[\xDE]/g, "P")
          .replace(/[\xE0-\xE5]/g, "a")
          .replace(/[\xE6]/g, "ae")
          .replace(/[\xE7]/g, "c")
          .replace(/[\xE8-\xEB]/g, "e")
          .replace(/[\xEC-\xEF]/g, "i")
          .replace(/[\xF1]/g, "n")
          .replace(/[\xF2-\xF6\xF8]/g, "o")
          .replace(/[\xF9-\xFC]/g, "u")
          .replace(/[\xFE]/g, "p")
          .replace(/[\xFD\xFF]/g, "y");
      }
  
      return str;
    }
  }
  
  
  /**
   * @dynamic is for runtime initializing DomHandler.browser
   *
   * If delete below comment, we can see this error message:
   *  Metadata collected contains an error that will be reported at runtime:
   *  Only initialized variables and constants can be referenced
   *  because the value of this variable is needed by the template compiler.
   */
  // @dynamic
  export class DomHandler {
  
    public static zindex: number = 1000;
  
    private static calculatedScrollbarWidth: number = null;
  
    private static calculatedScrollbarHeight: number = null;
  
    private static browser: any;
  
    public static addClass(element: any, className: string): void {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += ' ' + className;
    }
  
    public static addMultipleClasses(element: any, className: string): void {
      if (element.classList) {
        const styles: string[] = className.trim().split(' ');
        for (let i = 0; i < styles.length; i++) {
          element.classList.add(styles[i]);
        }
  
      }
      else {
        const styles: string[] = className.split(' ');
        for (let i = 0; i < styles.length; i++) {
          element.className += ' ' + styles[i];
        }
      }
    }
  
    public static removeClass(element: any, className: string): void {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  
    public static hasClass(element: any, className: string): boolean {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  
    public static siblings(element: any): any {
      return Array.prototype.filter.call(element.parentNode.children, function (child) {
        return child !== element;
      });
    }
  
    public static find(element: any, selector: string): any[] {
      return Array.from(element.querySelectorAll(selector));
    }
  
    public static findSingle(element: any, selector: string): any {
      if (element) {
        return element.querySelector(selector);
      }
      return null;
    }
  
    public static index(element: any): number {
      const children = element.parentNode.childNodes;
      let num = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i] == element) return num;
        if (children[i].nodeType == 1) num++;
      }
      return -1;
    }
  
    public static indexWithinGroup(element: any, attributeName: string): number {
      const children = element.parentNode ? element.parentNode.childNodes : [];
      let num = 0;
      for (let i = 0; i < children.length; i++) {
        if (children[i] == element) return num;
        if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1) num++;
      }
      return -1;
    }
  
    public static relativePosition(element: any, target: any): void {
      const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top: number, left: number;
  
      if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
        top = -1 * (elementDimensions.height);
        element.style.transformOrigin = 'bottom';
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      }
      else {
        top = targetHeight;
        element.style.transformOrigin = 'top';
      }
  
      if (elementDimensions.width > viewport.width) {
        // element wider then viewport and cannot fit on screen (align at left side of viewport)
        left = targetOffset.left * -1;
      }
      else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
        // element wider then viewport but can be fit on screen (align at right side of viewport)
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      }
      else {
        // element fits on screen (align with target)
        left = 0;
      }
  
      element.style.top = top + 'px';
      element.style.left = left + 'px';
    }
  
    public static absolutePosition(element: any, target: any): void {
      const elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
      const elementOuterHeight = elementDimensions.height;
      const elementOuterWidth = elementDimensions.width;
      const targetOuterHeight = target.offsetHeight;
      const targetOuterWidth = target.offsetWidth;
      const targetOffset = target.getBoundingClientRect();
      const windowScrollTop = this.getWindowScrollTop();
      const windowScrollLeft = this.getWindowScrollLeft();
      const viewport = this.getViewport();
      let top, left;
  
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        element.style.transformOrigin = 'bottom';
  
        if (top < 0) {
          top = windowScrollTop;
        }
      }
      else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = 'top';
      }
  
      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else
        left = targetOffset.left + windowScrollLeft;
  
      element.style.top = top + 'px';
      element.style.left = left + 'px';
    }
  
    static getParents(element: any, parents: any = []): any {
      return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
    }
  
    static getScrollableParents(element: any) {
      const scrollableParents = [];
  
      if (element) {
        const parents = this.getParents(element);
        const overflowRegex = /(auto|scroll)/;
        const overflowCheck = (node: any) => {
          const styleDeclaration = window['getComputedStyle'](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
        };
  
        for (const parent of parents) {
          const scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
          if (scrollSelectors) {
            const selectors = scrollSelectors.split(',');
            for (const selector of selectors) {
              const el = this.findSingle(parent, selector);
              if (el && overflowCheck(el)) {
                scrollableParents.push(el);
              }
            }
          }
  
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      }
  
      return scrollableParents;
    }
  
    public static getHiddenElementOuterHeight(element: any): number {
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      const elementHeight = element.offsetHeight;
      element.style.display = 'none';
      element.style.visibility = 'visible';
  
      return elementHeight;
    }
  
    public static getHiddenElementOuterWidth(element: any): number {
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      const elementWidth = element.offsetWidth;
      element.style.display = 'none';
      element.style.visibility = 'visible';
  
      return elementWidth;
    }
  
    public static getHiddenElementDimensions(element: any): any {
      const dimensions: any = {};
      element.style.visibility = 'hidden';
      element.style.display = 'block';
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = 'none';
      element.style.visibility = 'visible';
  
      return dimensions;
    }
  
    public static scrollInView(container, item) {
      const borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
      const borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
      const paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
      const paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
      const scroll = container.scrollTop;
      const elementHeight = container.clientHeight;
      const itemHeight = this.getOuterHeight(item);
  
      if (offset < 0) {
        container.scrollTop = scroll + offset;
      }
      else if ((offset + itemHeight) > elementHeight) {
        container.scrollTop = scroll + offset - elementHeight + itemHeight;
      }
    }
  
    public static fadeIn(element, duration: number): void {
      element.style.opacity = 0;
  
      let last = +new Date();
      let opacity = 0;
      const tick = function () {
        opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date();
  
        if (+opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };
  
      tick();
    }
  
    public static fadeOut(element, ms) {
      let opacity = 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;
  
      const fading = setInterval(() => {
        opacity = opacity - gap;
  
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
  
        element.style.opacity = opacity;
      }, interval);
    }
  
    public static getWindowScrollTop(): number {
      const doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  
    public static getWindowScrollLeft(): number {
      const doc = document.documentElement;
      return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
  
    public static matches(element, selector: string): boolean {
      const p = Element.prototype;
      const f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
      return f.call(element, selector);
    }
  
    public static getOuterWidth(el, margin?) {
      let width = el.offsetWidth;
  
      if (margin) {
        const style = getComputedStyle(el);
        width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
  
      return width;
    }
  
    public static getHorizontalPadding(el) {
      const style = getComputedStyle(el);
      return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }
  
    public static getHorizontalMargin(el) {
      const style = getComputedStyle(el);
      return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
  
    public static innerWidth(el) {
      let width = el.offsetWidth;
      const style = getComputedStyle(el);
  
      width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
  
    public static width(el) {
      let width = el.offsetWidth;
      const style = getComputedStyle(el);
  
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width;
    }
  
    public static getInnerHeight(el) {
      let height = el.offsetHeight;
      const style = getComputedStyle(el);
  
      height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      return height;
    }
  
    public static getOuterHeight(el, margin?) {
      let height = el.offsetHeight;
  
      if (margin) {
        const style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
  
      return height;
    }
  
    public static getHeight(el): number {
      let height = el.offsetHeight;
      const style = getComputedStyle(el);
  
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  
      return height;
    }
  
    public static getWidth(el): number {
      let width = el.offsetWidth;
      const style = getComputedStyle(el);
  
      width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
  
      return width;
    }
  
    public static getViewport(): any {
      const win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;
  
      return { width: w, height: h };
    }
  
    public static getOffset(el) {
      const rect = el.getBoundingClientRect();
  
      return {
        top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
        left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
      };
    }
  
    public static replaceElementWith(element: any, replacementElement: any): any {
      const parentNode = element.parentNode;
      if (!parentNode)
        throw `Can't replace element`;
      return parentNode.replaceChild(replacementElement, element);
    }
  
    public static getUserAgent(): string {
      return navigator.userAgent;
    }
  
    public static isIE() {
      const ua = window.navigator.userAgent;
  
      const msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return true;
      }
  
      const trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:');
        return true;
      }
  
      const edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return true;
      }
  
      // other browser
      return false;
    }
  
    public static isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }
  
    public static isAndroid() {
      return /(android)/i.test(navigator.userAgent);
    }
  
    public static appendChild(element: any, target: any) {
      if (this.isElement(target))
        target.appendChild(element);
      else if (target.el && target.el.nativeElement)
        target.el.nativeElement.appendChild(element);
      else
        throw 'Cannot append ' + target + ' to ' + element;
    }
  
    public static removeChild(element: any, target: any) {
      if (this.isElement(target))
        target.removeChild(element);
      else if (target.el && target.el.nativeElement)
        target.el.nativeElement.removeChild(element);
      else
        throw 'Cannot remove ' + element + ' from ' + target;
    }
  
    public static removeElement(element: Element) {
      if (!('remove' in Element.prototype))
        element.parentNode.removeChild(element);
      else
        element.remove();
    }
  
    public static isElement(obj: any) {
      return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
      );
    }
  
    public static calculateScrollbarWidth(el?: HTMLElement): number {
      if (el) {
        const style = getComputedStyle(el);
        return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
      }
      else {
        if (this.calculatedScrollbarWidth !== null)
          return this.calculatedScrollbarWidth;
  
        const scrollDiv = document.createElement("div");
        scrollDiv.className = "p-scrollbar-measure";
        document.body.appendChild(scrollDiv);
  
        const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
  
        this.calculatedScrollbarWidth = scrollbarWidth;
  
        return scrollbarWidth;
      }
    }
  
    public static calculateScrollbarHeight(): number {
      if (this.calculatedScrollbarHeight !== null)
        return this.calculatedScrollbarHeight;
  
      const scrollDiv = document.createElement("div");
      scrollDiv.className = "p-scrollbar-measure";
      document.body.appendChild(scrollDiv);
  
      const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
      document.body.removeChild(scrollDiv);
  
      this.calculatedScrollbarWidth = scrollbarHeight;
  
      return scrollbarHeight;
    }
  
    public static invokeElementMethod(element: any, methodName: string, args?: any[]): void {
      (element as any)[methodName].apply(element, args);
    }
  
    public static clearSelection(): void {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
          window.getSelection().removeAllRanges();
        }
      }
      else if (document['selection'] && document['selection'].empty) {
        try {
          document['selection'].empty();
        } catch (error) {
          //ignore IE bug
        }
      }
    }
  
    public static getBrowser() {
      if (!this.browser) {
        const matched = this.resolveUserAgent();
        this.browser = {};
  
        if (matched.browser) {
          this.browser[matched.browser] = true;
          this.browser['version'] = matched.version;
        }
  
        if (this.browser['chrome']) {
          this.browser['webkit'] = true;
        } else if (this.browser['webkit']) {
          this.browser['safari'] = true;
        }
      }
  
      return this.browser;
    }
  
    public static resolveUserAgent() {
      const ua = navigator.userAgent.toLowerCase();
      const match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];
  
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
  
    public static isInteger(value): boolean {
      if (Number.isInteger) {
        return Number.isInteger(value);
      }
      else {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      }
    }
  
    public static isHidden(element: HTMLElement): boolean {
      return element.offsetParent === null;
    }
  
    public static getFocusableElements(element: HTMLElement) {
      const focusableElements = DomHandler.find(element, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`
      );
  
      const visibleFocusableElements = [];
      for (const focusableElement of focusableElements) {
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
          visibleFocusableElements.push(focusableElement);
      }
      return visibleFocusableElements;
    }
  
    static generateZIndex() {
      this.zindex = this.zindex || 999;
      return ++this.zindex;
    }
  }
  
  

@Injectable({providedIn: 'root'})
export class FilterService {

    filter(value: any[], fields: any[], filterValue: any, filterMatchMode: string, filterLocale?: string) {
        let filteredItems: any[] = [];

        if (value) {
            for (let item of value) {
                for (let field of fields) {
                    let fieldValue = ObjectUtils.resolveFieldData(item, field);

                    if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                        filteredItems.push(item);
                        break;
                    }
                }
            }
        }

        return filteredItems;
    }
    
    public filters = {
        startsWith: (value, filter, filterLocale?):boolean =>  {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.slice(0, filterValue.length) === filterValue;
        },

        contains: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue) !== -1;
        },

        notContains: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue) === -1;
        },

        endsWith: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            let filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            let stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    
            return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
        },

        equals: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() === filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },

        notEquals: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }
    
            if (value === undefined || value === null) {
                return true;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() !== filter.getTime();
            else
                return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },

        in: (value, filter: any[]):boolean => {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }
    
            for (let i = 0; i < filter.length; i++) {
                if (ObjectUtils.equals(value, filter[i])) {
                    return true;
                }
            }
    
            return false;
        },

        between: (value, filter: any[]):boolean => {
            if (filter == null || filter[0] == null || filter[1] == null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime)
            return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
            else
                return filter[0] <= value && value <= filter[1];
        },

        lt: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() < filter.getTime();
            else
                return value < filter;
        },

        lte: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() <= filter.getTime();
            else
                return value <= filter;
        },

        gt: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() > filter.getTime();
            else
                return value > filter;
        },

        gte: (value, filter, filterLocale?):boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
    
            if (value.getTime && filter.getTime)
                return value.getTime() >= filter.getTime();
            else
                return value >= filter;
        },

        is: (value, filter, filterLocale?):boolean => {
            return this.filters.equals(value, filter, filterLocale);
        },

        isNot: (value, filter, filterLocale?): boolean => {
            return this.filters.notEquals(value, filter, filterLocale);
        },

        before: (value, filter, filterLocale?): boolean => {
            return this.filters.lt(value, filter, filterLocale);
        },

        after: (value, filter, filterLocale?): boolean => {
            return this.filters.gt(value, filter, filterLocale);
        },

        dateIs: (value, filter): boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.toDateString() === filter.toDateString();
        },

        dateIsNot: (value, filter): boolean => {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.toDateString() !== filter.toDateString();
        },

        dateBefore: (value, filter): boolean =>  {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.getTime() < filter.getTime();
        },

        dateAfter: (value, filter): boolean =>  {
            if (filter === undefined || filter === null) {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }

            return value.getTime() > filter.getTime();
        }
    
    }

    register(rule: string, fn: Function) {
        this.filters[rule] = fn;
    }
}