import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectItemComponent } from './select-item.component';

export default {
  title: 'SelectItemComponent',
  component: SelectItemComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SelectItemComponent>;

const Template: Story<SelectItemComponent> = (args: SelectItemComponent) => ({
  component: SelectItemComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    option:  undefined,
    selected:  false,
    disabled:  false,
    visible:  true,
    itemSize:  25,
    label:  '',
    itemBg:  '',
}