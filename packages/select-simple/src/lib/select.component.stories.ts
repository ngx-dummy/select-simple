import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SelectSimpleModule } from './select-simple.module';
import { SelectComponent } from './select.component';

export default {
	title: 'SelectComponent',
	component: SelectComponent,
	decorators: [
		moduleMetadata({
			imports: [CommonModule, SelectSimpleModule],
		}),
	],
} as Meta<SelectComponent>;

const Template: Story<SelectComponent> = (args) => ({
	props: args,
});

export const Primary = Template.bind({});
Primary.args = {
	headerStyle: {
		backgroundColor: '#cca',
		color: '#fff',
	},
	panelStyle: {
		color: '#ccc',
	},
	panelStyleClass: 'panel',
	styleClass: 'panel__teal',
	readonly: false,
	required: false,
	resetBtn: false,
	autofocus: false,
	options: [
		{ country: 'RF', cities: ['Moscow', 'Kaluga'] },
		{ country: 'USA', cities: ['New York', 'Dallas'] },
	],
	optionLabelKey: 'cities',
	selectIconClass: '',
	placeholder: 'Select a country',
	tabindex: 0,
	// optionDisabled: '',
	disabled: false,
};

export const Disabled = Template.bind({});
Primary.args = {
	...Primary.args,
	disabled: true,
};

export const Readonly = Template.bind({});
Primary.args = {
	...Primary.args,
	readonly: true,
};
