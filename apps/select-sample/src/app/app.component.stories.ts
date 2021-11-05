import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AppComponent } from './app.component';

export default {
  title: 'AppComponent',
  component: AppComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AppComponent>;

const Template: Story<AppComponent> = (args: AppComponent) => ({
  component: AppComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  type: '',
  pTemplate: '',
  option: {},
  selected: false,
  label: '',
  disabled: false,
  visible: false,
  itemSize: 0,
  template: {},
  dropBtnTemplate: undefined,
  scrollHeight: '20rem',
  filter: false,
  name: '',
  style: {},
  panelStyle: {},
  styleClass: '',
  panelStyleClass: '',
  readonly: false,
  required: false,
  editable: false,
  appendTo: {},
  tabindex: 0,
  placeholder: '',
  filterPlaceholder: '',
  filterLocale: '',
  inputId: '',
  selectId: '',
  dataKey: '',
  filterBy: '',
  autofocus: false,
  resetFilterOnHide: false,
  dropdownIcon: 'pi pi-chevron-down',
  optionLabel: '',
  optionValue: '',
  optionDisabled: '',
  optionGroupLabel: '',
  optionGroupChildren: "items",
  autoDisplayFirst: true,
  group: false,
  showClear: false,
  emptyFilterMessage: '',
  emptyMessage: '',
  virtualScroll: false,
  autoZIndex: true,
  baseZIndex: 0,
  showTransitionOptions: '.12s cubic-bezier(0, 0, 0.2, 1)',
  hideTransitionOptions: '.1s linear',
  ariaFilterLabel: '',
  ariaLabelledBy: '',
  filterMatchMode: "contains",
  maxlength: 0,
  tooltip: '',
  tooltipPosition: 'right',
  tooltipPositionStyle: 'absolute',
  tooltipStyleClass: '',
  autofocusFilter: true,
  options: {},
  filterValue: '',
};