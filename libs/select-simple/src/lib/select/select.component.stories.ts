import { BrowserModule } from '@angular/platform-browser';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Parameters, OptionsParameter } from '@storybook/addons';
import { ActionOptions, ActionsMap, action, withActions } from '@storybook/addon-actions';
import { text, number, boolean, array, select, object } from '@storybook/addon-knobs';
import {} from '@storybook/angular/dist/client';
import { SelectSimpleModule } from '../select-simple.module';

// const cities = [
//   { name: 'Moscow', code: 'MS' },
//   { name: 'St.Pete', code: 'SPB' },
//   { name: 'Kaluga', code: 'KLG' },
//   { name: 'Tula', code: 'TUL' },
// ];
// .map(item => item.name);

// const testOpts = object('options', cities);

// export default {
//   title: 'selectComponent'
// };

// export const primary = () => ({
//   moduleMetadata: {
//     imports: [BrowserModule, SelectDummyModule],
//   },
//   component: selectComponent,
//   props: {
//     dropBtnTemplate: text('dropBtnTemplate', undefined),
//     name: text('name', 'Test'),
//     style: object('style', { color: 'green' }),
//     panelStyle: text('panelStyle', ''),
//     styleClass: text('styleClass', ''),
//     panelStyleClass: text('panelStyleClass', ''),
//     readonly: boolean('readonly', false),
//     placeholder: text('placeholder', 'Select some Item'),
//     optionLabel: text('optionLabel', 'name'),
//     selectIconClass: text('selectIconClass', ''),
//     optionValue: text('optionValue', 'Option1'),
//     optionDisabled: text('optionDisabled', ''),
//     itemSize: text('itemSize', '100'),
//     options: testOpts,
//     disabled: boolean('disabled', false),
//   }
// });

const optsParams: OptionsParameter = {
	theme: {
		brandTitle: 'Storybook sample',
		base: 'Storybook sample',
	},
};

const params: Parameters = {
	options: optsParams,
	layout: 'centered',
};

storiesOf('select test', module)
	.addParameters({
		...params,
	})
	.addDecorator(
		moduleMetadata({
			imports: [BrowserModule, SelectSimpleModule],
		})
	)

	.add('Via content projection', () => ({
		template: `
      <ngxd-select [autofocus]="true" [none]="true" [readonly]="readonly" [visible]="visible" [disabled]="disabled" placeholder="Select A Value" 
        [panelStyle]="panelStyling" [headerStyle]="headerStyling">
        <!-- uses the content projection by <simple-items> className (refer to sources) -->
        <div class="simple-items">
          <ngxd-select-item [visible]="visible" [itemSize]="size" [disabled]="disabled" [label]="'Kaluga label'" [option]="'Kaluga'" ></ngxd-select-item>
          <ngxd-select-item [visible]="visible" [itemSize]="size" [disabled]="disabled" [label]="'Vladivostok'" [option]="'Vladivostok'" ></ngxd-select-item>
        </div>
      </ngxd-select>
    `,
		props: {
			readonly: boolean('readonly', false),
			visible: boolean('visible', true),
			disabled: boolean('disabled', false),
			size: number('itemSize', 50),
			// This is a way (one of) how to style the component (header, items ...)
			headerStyling: object('headerStyling', {
				background: '#caa9',
				width: '40%',
			}),
			// Extra styling to the panel
			panelStyling: object('panelStyling', {
				background: '#10882a38',
				color: '#91c',
				fontSize: '700',
				lineHeight: '200%',
				borderRadius: '1rem',
				border: 'none',
				boxShadow: '1px 5px 2px rgba(155, 225, 225, .25)',
				left: '.5rem',
				width: '200%',
				display: 'grid',
				placeContent: 'center',
				justifyContent: 'space-around',
			}),
		},
	}))

	.add('Via content projection via ngForOf', () => ({
		template: `
      <ngxd-select tabindex="2" [visible]="visible" [disabled]="disabled" [readonly]="readonly" [panelStyle]="panelStyling" [headerStyle]="headerStyling" placeholder="Select an item (produced via ngForOf directive)">
        <div class="simple-items">
          <ngxd-select-item *ngFor="let item of options" [option]="item.name" [label]="item.name"></ngxd-select-item>
        </div>
      </ngxd-select>
    `,
		props: {
			readonly: boolean('readonly', true),
			options: object('objects', [
				{ name: 'Moscow', code: 'MS' },
				{ name: 'St.Pete', code: 'SPB' },
				{ name: 'Kaluga', code: 'KLG' },
				{ name: 'Tula', code: 'TUL' },
			]),
			visible: boolean('visible', true),
			disabled: boolean('disabled', false),
			size: number('itemSize', 70),
			headerStyling: object('headerStyling', {
				background: 'rgb(210 23 23 / 15%)',
				color: '#CA1',
			}),
			panelStyling: object('panelStyle', {
				background: '#ccc',
				color: '#091',
			}),
		},
	}))

	.add('Via content options bindings', () => ({
		template: `
      <ngxd-select tabindex="3" [itemSize]="itemSize" [visible]="visible" [disabled]="disabled" [readonly]="readonly" placeholder="Select A Value" [options]="options" [optionLabelKey]="optionLabelKey" ></ngxd-select>
    `,
		props: {
			readonly: boolean('readonly', false),
			itemSize: number('itemSize', 35),
			optionLabelKey: text('optionLabelKey', 'name'),
			options: object('objects', [
				{ name: 'Moscow', code: 'MS' },
				{ name: 'St.Pete', code: 'SPB' },
				{ name: 'Kaluga', code: 'KLG' },
				{ name: 'Tula', code: 'TUL' },
			]),
		},
	}));
