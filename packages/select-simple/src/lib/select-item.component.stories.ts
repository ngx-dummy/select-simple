import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectSimpleModule } from '..';
import { SelectItemComponent } from './select-item.component';

export default {
  title: 'SelectItemComponent',
  component: SelectItemComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectSimpleModule],
    })
  ],
} as Meta<SelectItemComponent>;

const Template: Story<SelectItemComponent> = (args: SelectItemComponent) => ({
  component: SelectItemComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  option: { label: 'Hello World', disabled: false },
  
  selected: false,
  visible: true,
  itemSize: 25,
  // label: '',
  itemBg: 'green',
};