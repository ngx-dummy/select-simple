import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SelectSimpleModule } from '..';
import { SelectItemComponent } from './select-item.component';

export default {
	title: 'SelectItemComponent',
	component: SelectItemComponent,
	decorators: [
		moduleMetadata({
			imports: [SelectSimpleModule],
		}),
	],
} as Meta<SelectItemComponent>;

const Template: Story<SelectItemComponent> = (args) => ({
	props: args,
});

export const Primary = Template.bind({});
Primary.args = {
	option: { label: 'Hello World', disabled: false },
	label: 'Hello',
	color: '#ccc',
	selected: false,
	visible: true,
	itemSize: 25,
	itemBg: '#000',
};

export const Green = Template.bind({});
Green.args = {
	...Primary.args,
	itemBg: 'green',
	label: 'Green',
};
