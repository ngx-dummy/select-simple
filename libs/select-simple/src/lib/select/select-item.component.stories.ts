import { CommonModule } from '@angular/common';
import { text, number, boolean, object } from '@storybook/addon-knobs';
// import { SelectDummyModule } from '../select-dummy.module';
import { ISelectItem, SelectItemComponent } from './select-item.component';

export default {
	title: 'DropdownItemComponent',
};

export const primary = () => ({
	moduleMetadata: {
		imports: [CommonModule],
	},
	component: SelectItemComponent,
	props: {
		selected: boolean('selected', true),
		label: text('label', 'Test Value'),
		disabled: boolean('disabled', false),
		visible: boolean('visible', true),
		itemSize: number('itemSize', 50),
	},
});
