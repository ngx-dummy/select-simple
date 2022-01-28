describe('select-simple', () => {
  beforeEach(() => cy.visit('/iframe.html?id=selectitemcomponent--primary&args=option;selected:false;disabled:false;visible:true;itemSize:25;label;itemBg;template;'));
  it('should render the component', () => {
    cy.get('ngxd-select-item').should('exist');
  });
});