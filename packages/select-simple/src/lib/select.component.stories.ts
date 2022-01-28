import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectComponent } from './select.component';

export default {
  title: 'SelectComponent',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SelectComponent>;

const Template: Story<SelectComponent> = (args: SelectComponent) => ({
  component: SelectComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    headerStyle:  '',
    panelStyle:  '',
    panelStyleClass:  'panel',
    styleClass:  '',
    readonly:  false,
    required:  false,
    none:  false,
    autofocus:  false,
    placeholder:  '',
    optionLabelKey:  '',
    selectIconClass:  '',
    optionValue:  '',
    tabindex:  0,
    optionDisabled:  '',
    disabled:  false,
}