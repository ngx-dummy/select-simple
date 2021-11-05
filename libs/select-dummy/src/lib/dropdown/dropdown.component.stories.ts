import { BrowserModule } from '@angular/platform-browser';
import { text, number, boolean, array, select, object, } from '@storybook/addon-knobs';
import { } from "@storybook/angular/dist/client";
import { DropdownComponent } from './dropdown.component';
import { SelectDummyModule } from '../select-simple.module';

const cities = [
  { name: 'Moscow', code: 'MS' },
  { name: 'St.Pete', code: 'SPB' },
  { name: 'Kaluga', code: 'KLG' },
  { name: 'Tula', code: 'TUL' },
];
// .map(item => item.name);

const testOpts = object('options', cities);

export default {
  title: 'DropdownComponent'
};

export const primary = () => ({
  moduleMetadata: {
    imports: [BrowserModule, SelectDummyModule],
  },
  component: DropdownComponent,
  props: {
    dropBtnTemplate: text('dropBtnTemplate', undefined),
    name: text('name', 'Test'),
    style: object('style', { color: 'green' }),
    panelStyle: text('panelStyle', ''),
    styleClass: text('styleClass', ''),
    panelStyleClass: text('panelStyleClass', ''),
    readonly: boolean('readonly', false),
    placeholder: text('placeholder', 'Select some Item'),
    optionLabel: text('optionLabel', 'name'),
    dropdownIconClass: text('dropdownIconClass', ''),
    optionValue: text('optionValue', 'Option1'),
    optionDisabled: text('optionDisabled', ''),
    itemSize: text('itemSize', '100'),
    options: testOpts,
    disabled: boolean('disabled', false),
  }
});
