import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectSimpleModule } from '..';
import { SelectComponent } from './select.component';

export default {
  title: 'SelectComponent',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectSimpleModule],
    })
  ],
} as Meta<SelectComponent>;

const Template: Story<SelectComponent> = (args: SelectComponent) => ({
  component: SelectComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  headerStyle: {
    backgroundColor: 'red'
    , color: 'yellow'
  },
  panelStyle: {
    color: '#CAA'
  },
  panelStyleClass: 'panel',
  styleClass: 'panel__teal',
  readonly: false,
  required: false,
  resetBtn: false,
  autofocus: false,
  options: [{ country: 'RF', cities: ['Moscow', 'Kaluga'] }, { country: 'USA', cities: ['New York', 'Dallas'] }],
  optionLabelKey: '',
  selectIconClass: '',
  placeholder: 'Select a city',
  tabindex: 0,
  // optionDisabled: '',
  disabled: false,
};