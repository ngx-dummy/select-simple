describe('select-simple', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectcomponent--primary&args=templates;name;headerStyle;panelStyle;panelStyleClass:panel;styleClass;readonly:false;required:false;none:false;autofocus:false;placeholder;optionLabelKey;selectIconClass;optionValue;tabindex:0;optionDisabled;itemSize;options;disabled;'));
  it('should render the component', () => {
    cy.get('ngxd-select').should('exist');
  });
});