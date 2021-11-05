import { CommonModule } from '@angular/common';
import { text, number, boolean } from '@storybook/addon-knobs';
import { DropdownItemComponent } from './dropdown-item.component';

export default {
  title: 'DropdownItemComponent'
};

export const primary = () => ({
  moduleMetadata: {
    imports: [CommonModule]
  },
  component: DropdownItemComponent,
  props: {
    option: text('option', null),
    selected: boolean('selected', false),
    label: text('label', 'Option1'),
    disabled: boolean('disabled', false),
    visible: boolean('visible', false),
    itemSize: number('itemSize', 0),
    template: text('template', null),
  }
});
