"use strict";
(self["webpackChunkselect_sample"] = self["webpackChunkselect_sample"] || []).push([["main"],{

/***/ 9540:
/*!*********************************************************!*\
  !*** ./packages/select-sample/src/app/app.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _select_simple_src_lib_select_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../select-simple/src/lib/select.component */ 3973);
/* harmony import */ var _select_simple_src_lib_select_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../select-simple/src/lib/select-item.component */ 4715);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);







const _c0 = ["btnTmpl"];
const _c1 = ["selectedItemTemplate"];
function AppComponent_ngxd_select_item_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ngxd-select-item", 16);
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("option", item_r5)("label", item_r5.name);
} }
function AppComponent_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "span", 17);
} if (rf & 2) {
    const visible_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("up", visible_r6);
} }
function AppComponent_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const label_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](label_r7);
} }
const _c2 = function () { return { name: "Vladivostok" }; };
class AppComponent {
    constructor() {
        this.class = 'flex pad-1_2';
        this.title = 'Select-sample';
        this.selectedCity1 = undefined;
        this.selectedCity2 = undefined;
        this.selectedCity3 = undefined;
        this.itemsTemplates = {};
        this.headStyle = {
            backgroundColor: '#4d537c',
            border: '4px dotted teal',
            color: '#e2e1e1',
            padding: '1rem',
            boxShadow: 'teal 3px 3px 11px',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '25rem',
        };
        this.panelStyling = {
            color: '#fff',
            backgroundColor: '#0e4a3bcc',
            padding: '10%',
            fontSize: '700',
            lineHeight: '200%',
            borderRadius: '1rem',
            border: 'none',
            boxShadow: '2px 5px 2px #DDD',
            left: '.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
        };
        this.cities = [
            { name: 'Moscow', code: 'MS' },
            { name: 'St.Pete', code: 'SPB' },
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
        ];
        this.simpleCitiesArray = [...this.cities].map(({ name }) => name);
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
            selector: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(this.cities[0]),
        });
    }
    checkFormValid($event) {
        $event.preventDefault();
        alert('Is form valid: ' + this.form.valid);
    }
    ngOnInit() {
        this.itemsTemplates = {
            openerBtnTemplate: this.bntOpenTmpl,
            selectedItemTemplate: this.selectedItemTemplate,
        };
        this.form.valueChanges.subscribe((formValue) => {
            console.log({ formValue, formValid: this.form.valid });
            this.selectedCity1 = { formValue, formValid: this.form.valid };
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["ngx-dummy-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.bntOpenTmpl = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.selectedItemTemplate = _t.first);
    } }, hostVars: 2, hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.class);
    } }, decls: 48, vars: 35, consts: [[1, "demo"], [3, "formGroup", "ngSubmit"], [1, "resources"], ["id", "select1", "formControlName", "selector", "placeholder", "Select a City", "optionLabelKey", "name", 3, "options", "templates", "readonly", "required", "resetBtn", "searchField", "tabindex", "autofocus"], ["type", "submit", 1, "resource", "gutter-1", 3, "disabled"], [1, "box"], ["id", "select2", 3, "tabindex", "options", "panelStyle", "headerStyle", "ngModel", "ngModelChange"], ["id", "select3", "placeholder", "Via Projection", 3, "tabindex", "ngModel", "ngModelChange"], [1, "simple-items"], ["label", "Kaluga", "option", "Kaluga", 3, "visible", "optionClick"], ["label", "Vladivostok", 3, "visible", "option", "optionClick"], [3, "option", "label", 4, "ngFor", "ngForOf"], ["id", "select4", "placeholder", "Disabled", 3, "tabindex", "disabled"], ["id", "select5", 3, "readonly", "options"], ["btnTmpl", ""], ["selectedItemTemplate", ""], [3, "option", "label"], [1, "open-btn"], [1, "selected-container"], ["name", "add-circle-outline"], [1, "label"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "section", 0)(1, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Reactive form sample:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function AppComponent_Template_form_ngSubmit_3_listener($event) { return ctx.checkFormValid($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "ngxd-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Submit (is the form Valid)");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 5)(9, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "section", 0)(14, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "ngModel sample with custom templates (bound to simple strings):");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "ngxd-select", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngxd_select_ngModelChange_16_listener($event) { return ctx.selectedCity2 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 5)(18, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "section", 0)(23, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Sample using content projection of items:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "ngxd-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_ngxd_select_ngModelChange_25_listener($event) { return ctx.selectedCity3 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 8)(27, "ngxd-select-item", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("optionClick", function AppComponent_Template_ngxd_select_item_optionClick_27_listener($event) { return ctx.selectedCity3 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "ngxd-select-item", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("optionClick", function AppComponent_Template_ngxd_select_item_optionClick_28_listener($event) { return ctx.selectedCity3 = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](29, AppComponent_ngxd_select_item_29_Template, 1, 2, "ngxd-select-item", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "div", 5)(31, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](33, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](34, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "section", 0)(36, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Disabled sample:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](38, "ngxd-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "section", 0)(41, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Readonly sample:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](43, "ngxd-select", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, AppComponent_ng_template_44_Template, 1, 2, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](46, AppComponent_ng_template_46_Template, 5, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("options", ctx.cities)("templates", ctx.itemsTemplates)("readonly", false)("required", true)("resetBtn", true)("searchField", true)("tabindex", 1)("autofocus", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.form.valid || ctx.form.pristine);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 28, ctx.selectedCity1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("tabindex", 2)("options", ctx.simpleCitiesArray)("panelStyle", ctx.panelStyling)("headerStyle", ctx.headStyle)("ngModel", ctx.selectedCity2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](20, 30, ctx.selectedCity2));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("tabindex", 3)("ngModel", ctx.selectedCity3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("visible", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("visible", true)("option", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](34, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.cities);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](33, 32, ctx.selectedCity3));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("tabindex", 4)("disabled", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", true)("options", ctx.simpleCitiesArray);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _select_simple_src_lib_select_component__WEBPACK_IMPORTED_MODULE_0__.SelectComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _select_simple_src_lib_select_item_component__WEBPACK_IMPORTED_MODULE_1__.SelectItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.JsonPipe], styles: ["[_nghost-%COMP%] {\n  min-width: 30rem;\n  max-width: 70%;\n  margin: 1rem auto;\n  font-family: \"Montserrat\", sans-serif;\n}\n@media screen and (max-width: 720px) {\n  [_nghost-%COMP%] {\n    max-width: 80%;\n  }\n}\n.demo[_ngcontent-%COMP%] {\n  margin: 0.2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.gutter-left[_ngcontent-%COMP%] {\n  margin-left: 9px;\n}\n.col-span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\np[_ngcontent-%COMP%] {\n  text-align: center;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n.resources[_ngcontent-%COMP%] {\n  text-align: center;\n  list-style: none;\n  padding: 0.1rem;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n.resource[_ngcontent-%COMP%] {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n  transition: all 0.2s ease;\n}\n.resource[_ngcontent-%COMP%]:hover:not([disabled]) {\n  background-color: #4489ff7d;\n}\npre[_ngcontent-%COMP%] {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: #727272;\n  color: #eee;\n}\ndetails[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  color: #333;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 3px 9px;\n  margin-bottom: 9px;\n}\nsummary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n  height: 36px;\n  line-height: 36px;\n}\nhr[_ngcontent-%COMP%] {\n  border: 1px dashed #bbb;\n  width: 100%;\n}\n.gutter-1[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n[disabled][_ngcontent-%COMP%] {\n  color: #ccc;\n  background-color: #aacccc4b;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EscUNBQUE7QUFDRDtBQUNDO0VBTkQ7SUFPRSxjQUFBO0VBRUE7QUFDRjtBQUNBO0VBQ0MsY0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFFRDtBQUNBO0VBQ0MsZ0JBQUE7QUFFRDtBQUNBO0VBQ0MsbUJBQUE7QUFFRDtBQUNBO0VBQ0Msa0JBQUE7QUFFRDtBQUNBO0VBQ0Msa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFFRDtBQUNBO0VBQ0Msa0JBQUE7RUFDQSxlQUFBO0VBQ0EscUJBQUE7QUFFRDtBQUNBO0VBQ0Msa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0FBRUQ7QUFDQTtFQUNDLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0FBRUQ7QUFDQTtFQUNDLDJCQUFBO0FBRUQ7QUFDQTtFQUNDLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtBQUVEO0FBQ0E7RUFDQyxrQkFBQTtFQUNBLFdBQUE7RUFDQSxrQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUVEO0FBQ0E7RUFDQyxlQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQUVEO0FBQ0E7RUFDQyx1QkFBQTtFQUNBLFdBQUE7QUFFRDtBQUNBO0VBQ0MsZ0JBQUE7QUFFRDtBQUNBO0VBQ0MsV0FBQTtFQUNBLDJCQUFBO0FBRUQiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG5cdG1pbi13aWR0aDogMzByZW07XHJcblx0bWF4LXdpZHRoOiA3MCU7XHJcblx0bWFyZ2luOiAxcmVtIGF1dG87XHJcblx0Zm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcclxuXHJcblx0QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzIwcHgpIHtcclxuXHRcdG1heC13aWR0aDogODAlO1xyXG5cdH1cclxufVxyXG5cclxuLmRlbW8ge1xyXG5cdG1hcmdpbjogLjJyZW07XHJcblx0ZGlzcGxheTogZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdGdhcDogMXJlbTtcclxufVxyXG5cclxuLmd1dHRlci1sZWZ0IHtcclxuXHRtYXJnaW4tbGVmdDogOXB4O1xyXG59XHJcblxyXG4uY29sLXNwYW4tMiB7XHJcblx0Z3JpZC1jb2x1bW46IHNwYW4gMjtcclxufVxyXG5cclxucCB7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMSB7XHJcblx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdG1hcmdpbi1sZWZ0OiAxOHB4O1xyXG5cdGZvbnQtc2l6ZTogMjRweDtcclxufVxyXG5cclxuaDIge1xyXG5cdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRmb250LXNpemU6IDIwcHg7XHJcblx0bWFyZ2luOiA0MHB4IDAgMTBweCAwO1xyXG59XHJcblxyXG4ucmVzb3VyY2VzIHtcclxuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHRwYWRkaW5nOiAwLjFyZW07XHJcblx0ZGlzcGxheTogZ3JpZDtcclxuXHRncmlkLWdhcDogOXB4O1xyXG5cdGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcclxufVxyXG5cclxuLnJlc291cmNlIHtcclxuXHRjb2xvcjogIzAwOTRiYTtcclxuXHRoZWlnaHQ6IDM2cHg7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcclxuXHRib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG5cdGJvcmRlci1yYWRpdXM6IDRweDtcclxuXHRwYWRkaW5nOiAzcHggOXB4O1xyXG5cdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHR0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG59XHJcblxyXG4ucmVzb3VyY2U6aG92ZXI6bm90KFtkaXNhYmxlZF0pIHtcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ4OWZmN2Q7XHJcbn1cclxuXHJcbnByZSB7XHJcblx0cGFkZGluZzogOXB4O1xyXG5cdGJvcmRlci1yYWRpdXM6IDRweDtcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNzI3MjcyO1xyXG5cdGNvbG9yOiAjZWVlO1xyXG59XHJcblxyXG5kZXRhaWxzIHtcclxuXHRib3JkZXItcmFkaXVzOiA0cHg7XHJcblx0Y29sb3I6ICMzMzM7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcclxuXHRib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG5cdHBhZGRpbmc6IDNweCA5cHg7XHJcblx0bWFyZ2luLWJvdHRvbTogOXB4O1xyXG59XHJcblxyXG5zdW1tYXJ5IHtcclxuXHRjdXJzb3I6IHBvaW50ZXI7XHJcblx0b3V0bGluZTogbm9uZTtcclxuXHRoZWlnaHQ6IDM2cHg7XHJcblx0bGluZS1oZWlnaHQ6IDM2cHg7XHJcbn1cclxuXHJcbmhyIHtcclxuXHRib3JkZXI6IDFweCBkYXNoZWQgI2JiYjtcclxuXHR3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmd1dHRlci0xIHtcclxuXHRtYXJnaW46IDAuNXJlbSAwO1xyXG59XHJcblxyXG5bZGlzYWJsZWRdIHtcclxuXHRjb2xvcjogI2NjYztcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYWFjY2NjNGI7XHJcbn1cclxuIl19 */", ".open-btn[_ngcontent-%COMP%] {\n\t\t\tdisplay: grid;\n\t\t\tplace-content: center;\n\t\t\tmargin: 0.1rem 1rem;\n\t\t\tpadding: 1rem;\n\t\t\tborder-radius: 0.2rem;\n\t\t\tcolor: #ffffff;\n\t\t\tfont-size: 14px;\n\t\t\tborder-color: red;\n\t\t\tposition: relative;\n\t\t\tbackground: blue\n\t\t\t\turl(\"data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='white'/></g></svg>\")\n\t\t\t\tno-repeat;\n\t\t\tbackground-position: right 5px top 50%;\n\t\t}\n\t\t.up[_ngcontent-%COMP%] {\n\t\t\ttransform: rotate(180deg);\n\t\t}", ".selected-container[_ngcontent-%COMP%] {\n\t\t\tbackground-color: aqua;\n\t\t\tborder-radius: .1rem;\n\t\t\tmin-height: 2rem;\n\t\t\tpadding: 0.2rem 0.4rem;\n\t\t\tmargin: 0.1rem;\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: space-around;\n\t\t\talign-items: center;\n\t\t}"] });


/***/ }),

/***/ 3069:
/*!******************************************************!*\
  !*** ./packages/select-sample/src/app/app.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 9540);
/* harmony import */ var _ngx_dummy_select_simple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-dummy/select-simple */ 7497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _ngx_dummy_select_simple__WEBPACK_IMPORTED_MODULE_1__.SelectSimpleModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.ReactiveFormsModule, _ngx_dummy_select_simple__WEBPACK_IMPORTED_MODULE_1__.SelectSimpleModule] }); })();


/***/ }),

/***/ 29:
/*!****************************************************************!*\
  !*** ./packages/select-sample/src/environments/environment.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 8587:
/*!********************************************!*\
  !*** ./packages/select-sample/src/main.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 3069);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 29);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch((err) => console.error(err));


/***/ }),

/***/ 7497:
/*!*********************************************!*\
  !*** ./packages/select-simple/src/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectComponent": () => (/* reexport safe */ _lib_select_component__WEBPACK_IMPORTED_MODULE_2__.SelectComponent),
/* harmony export */   "SelectItemComponent": () => (/* reexport safe */ _lib_select_item_component__WEBPACK_IMPORTED_MODULE_0__.SelectItemComponent),
/* harmony export */   "SelectSimpleModule": () => (/* reexport safe */ _lib_select_simple_module__WEBPACK_IMPORTED_MODULE_1__.SelectSimpleModule)
/* harmony export */ });
/* harmony import */ var _lib_select_item_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/select-item.component */ 4715);
/* harmony import */ var _lib_select_simple_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/select-simple.module */ 9783);
/* harmony import */ var _lib_select_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/select.component */ 3973);





/***/ }),

/***/ 4715:
/*!*****************************************************************!*\
  !*** ./packages/select-simple/src/lib/select-item.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectItemComponent": () => (/* binding */ SelectItemComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 6362);
/* eslint-disable @angular-eslint/no-host-metadata-property */



const _c0 = function () { return { "height": "height", "visibility": "visibility", "background-color": "itemBg", "color": "color" }; };
function SelectItemComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c1 = function (a0) { return { $implicit: a0 }; };
function SelectItemComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SelectItemComponent_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c1, ctx_r0.option));
} }
function SelectItemComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](0);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.caption);
} }
class SelectItemComponent {
    constructor() {
        this.option = undefined;
        this.selected = false;
        this.disabled = false;
        this.visible = true;
        this.itemBg = 'transparent';
        this.color = '#ddd';
        this.itemSize = 25;
        this.label = null;
        this.optionClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this.height = '100%';
        this.visibility = 'hidden';
        this.caption = 'Empty';
    }
    ngOnChanges(changes) {
        Object.entries(changes).forEach(([changeKey, changeVal]) => {
            var _a, _b;
            if (changeVal.currentValue === changeVal.previousValue)
                return;
            if (changeKey === 'itemSize') {
                this.height = (_a = (typeof this.itemSize === 'number' ? `${this.itemSize}px` : this.itemSize)) !== null && _a !== void 0 ? _a : '100%';
            }
            if (changeKey === 'visible') {
                this.visibility = this.visible ? 'visible' : 'hidden';
            }
            if (changeKey === 'option' || changeKey === 'label') {
                this.caption = ((_b = this.label) === null || _b === void 0 ? void 0 : _b.trim().length) ? this.label : 'Empty';
            }
        });
    }
    onOptionClick($event) {
        var _a;
        this.optionClick.emit({
            baseEvent: $event,
            option: (_a = this.option) !== null && _a !== void 0 ? _a : (this.label || 'Nothing selected'),
        });
    }
}
SelectItemComponent.ɵfac = function SelectItemComponent_Factory(t) { return new (t || SelectItemComponent)(); };
SelectItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SelectItemComponent, selectors: [["ngxd-select-item"]], hostVars: 11, hostBindings: function SelectItemComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SelectItemComponent_click_HostBindingHandler($event) { return ctx.onOptionClick($event); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0))("ngClass", ctx.option == null ? null : ctx.option.styleClass);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("role", "option")("disabled", ctx.disabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("select-item", true)("item-highlight", ctx.selected)("item-disabled", ctx.disabled);
    } }, inputs: { option: "option", selected: "selected", disabled: "disabled", visible: "visible", itemBg: "itemBg", color: "color", itemSize: "itemSize", label: "label", template: "template" }, outputs: { optionClick: "optionClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["simpleItemTmpl", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function SelectItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, SelectItemComponent_ng_container_0_Template, 2, 4, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SelectItemComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.template)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgTemplateOutlet], styles: ["[_nghost-%COMP%] {\n  display: block;\n  padding: 0.1rem;\n}\n[_nghost-%COMP%]   .item-disabled[_ngcontent-%COMP%] {\n  cursor: not-allowed !important;\n  pointer-events: none;\n  color: var(--ngxd-disabled);\n  -webkit-user-select: none;\n          user-select: none;\n}\n[_nghost-%COMP%]   .item-highlight[_ngcontent-%COMP%]:not(.item-disabled) {\n  -webkit-user-select: none;\n          user-select: none;\n  cursor: pointer;\n  pointer-events: all;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRztFQUNDLGNBQUE7RUFDQSxlQUFBO0FBQUo7QUFDSTtFQUNDLDhCQUFBO0VBQ0Esb0JBQUE7RUFDQSwyQkFBQTtFQUNBLHlCQUFBO1VBQUEsaUJBQUE7QUFDTDtBQUVJO0VBQ0MseUJBQUE7VUFBQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQUFMIiwiZmlsZSI6InNlbGVjdC1pdGVtLmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRcdFx0Omhvc3Qge1xuXHRcdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRcdFx0cGFkZGluZzogMC4xcmVtO1xuXHRcdFx0XHQuaXRlbS1kaXNhYmxlZCB7XG5cdFx0XHRcdFx0Y3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50O1xuXHRcdFx0XHRcdHBvaW50ZXItZXZlbnRzOiBub25lO1xuXHRcdFx0XHRcdGNvbG9yOiB2YXIoLS1uZ3hkLWRpc2FibGVkKTtcblx0XHRcdFx0XHR1c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC5pdGVtLWhpZ2hsaWdodDpub3QoLml0ZW0tZGlzYWJsZWQpIHtcblx0XHRcdFx0XHR1c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0XHRcdFx0cG9pbnRlci1ldmVudHM6IGFsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ 9783:
/*!****************************************************************!*\
  !*** ./packages/select-simple/src/lib/select-simple.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelectSimpleModule": () => (/* binding */ SelectSimpleModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _select_item_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-item.component */ 4715);
/* harmony import */ var _select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.component */ 3973);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class SelectSimpleModule {
}
SelectSimpleModule.ɵfac = function SelectSimpleModule_Factory(t) { return new (t || SelectSimpleModule)(); };
SelectSimpleModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SelectSimpleModule });
SelectSimpleModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SelectSimpleModule, { declarations: [_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent, _select_item_component__WEBPACK_IMPORTED_MODULE_0__.SelectItemComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule], exports: [_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent, _select_item_component__WEBPACK_IMPORTED_MODULE_0__.SelectItemComponent] }); })();


/***/ }),

/***/ 3973:
/*!************************************************************!*\
  !*** ./packages/select-simple/src/lib/select.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NG_VALIDATORS_PROVIDER": () => (/* binding */ NG_VALIDATORS_PROVIDER),
/* harmony export */   "SELECT_VALUE_ACCESSOR_PROVIDER": () => (/* binding */ SELECT_VALUE_ACCESSOR_PROVIDER),
/* harmony export */   "SelectComponent": () => (/* binding */ SelectComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 6317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 3280);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 9196);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 8951);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 1989);
/* harmony import */ var _select_item_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-item.component */ 4715);
/* harmony import */ var _settings_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings/helpers */ 3645);
/* harmony import */ var _theming_icons_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theming/icons-base */ 8638);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6362);












const _c0 = ["defaultSelectIconTmpl"];
const _c1 = ["itemsListDefaultTmpl"];
function SelectComponent_span_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r15.label);
  }
}
function SelectComponent_span_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectComponent_span_0_ng_container_1_Template, 2, 1, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r0.selectedItemTemplate)("ngIfElse", _r5);
  }
}
function SelectComponent_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
const _c2 = function (a0) {
  return {
    $implicit: a0
  };
};
function SelectComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectComponent_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngTemplateOutlet", ctx_r1.openerBtnTemplate)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 2, ctx_r1.overlayVisible$)));
  }
}
function SelectComponent_div_4_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
function SelectComponent_div_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectComponent_div_4_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngTemplateOutlet", _r13);
  }
}
function SelectComponent_div_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
function SelectComponent_div_4_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectComponent_div_4_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return ctx_r21.reset();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function SelectComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectComponent_div_4_ng_container_1_Template, 2, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SelectComponent_div_4_ng_container_2_Template, 1, 0, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SelectComponent_div_4_button_4_Template, 3, 0, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](13);
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](15);
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx_r2.panelStyleClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", ctx_r2.panelStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.searchField);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !!((tmp_3_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 8, ctx_r2.optionsToDisplay$)) == null ? null : tmp_3_0.length))("ngIfThen", _r9)("ngIfElse", _r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r2.resetBtn);
  }
}
const _c3 = function (a1) {
  return {
    "select-label": true,
    "select-label-empty": a1
  };
};
function SelectComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](2, _c3, !!!(ctx_r4.placeholder == null ? null : ctx_r4.placeholder.length)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r4.placeholder || "empty", " ");
  }
}
function SelectComponent_ng_template_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0);
  }
}
const _c4 = function (a0, a1) {
  return {
    $implicit: a0,
    selectedOption: a1
  };
};
function SelectComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SelectComponent_ng_template_8_ng_container_0_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngTemplateOutlet", ctx_r6.selectedItemTemplate)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](2, _c4, ctx_r6.label, ctx_r6.selectedOption));
  }
}
const _c5 = function (a0, a1) {
  return {
    open: a0,
    close: a1
  };
};
function SelectComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const overlayVisible_r24 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r8.selectIconClass)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction2"](3, _c5, overlayVisible_r24, !overlayVisible_r24));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx_r8.trigger_icon, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
  }
}
function SelectComponent_ng_template_12_ng_container_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ngxd-select-item", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("optionClick", function SelectComponent_ng_template_12_ng_container_2_ng_template_1_Template_ngxd_select_item_optionClick_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return ctx_r30.onItemClick($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r28 = ctx.$implicit;
    const i_r29 = ctx.index;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("id", i_r29)("selected", ctx_r27.selectedOption === option_r28)("label", ctx_r27.getOptionLabel(option_r28))("disabled", ctx_r27.isOptionDisabled(option_r28))("template", ctx_r27.itemTemplate)("itemSize", ctx_r27.itemSize);
  }
}
function SelectComponent_ng_template_12_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectComponent_ng_template_12_ng_container_2_ng_template_1_Template, 1, 6, "ng-template", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const optionsToDisplay_r26 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", optionsToDisplay_r26);
  }
}
function SelectComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 19)(1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SelectComponent_ng_template_12_ng_container_2_Template, 2, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 1, ctx_r10.optionsToDisplay$));
  }
}
function SelectComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 19)(1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function SelectComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 23)(1, "div", 24)(2, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectComponent_ng_template_16_Template_input_click_2_listener($event) {
      $event.preventDefault();
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "svg", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "path", 27)(5, "path", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
}
const _c6 = [[["", 8, "simple-items"]]];
const _c7 = [".simple-items"];
const SELECT_VALUE_ACCESSOR_PROVIDER = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(() => SelectComponent),
  multi: true
};
const NG_VALIDATORS_PROVIDER = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(() => SelectComponent),
  multi: true
};
class SelectComponent {
  constructor(
  // @Self() @Optional() ngControl: NgControl,
  el, renderer, cd, sanitizer, zone) {
    this.el = el;
    this.renderer = renderer;
    this.cd = cd;
    this.sanitizer = sanitizer;
    this.zone = zone;
    this.name = null;
    /** set additional custom classList to the Select component's panel   */
    this.panelStyleClass = 'panel';
    /** set additional custom classList to the Select component   */
    this.styleClass = '';
    this.readonly = false;
    this.required = false;
    /** whether to display reset button in the end of the options   */
    this.resetBtn = false;
    /** whether to display search field */
    this.searchField = false;
    /** whether to set auto focus to component */
    this.autofocus = false;
    /** default component caption (panel caption) */
    this.placeholder = undefined;
    /** string key of the Options input (in case of complex object) of kind: 'key' / 'key.subkey'...  if set, would resolve the options' captions */
    this.optionLabelKey = undefined;
    this.selectIconClass = '';
    this.tabindex = 0;
    this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.onFocus = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.onBlur = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.trigger_icon = (0,_settings_helpers__WEBPACK_IMPORTED_MODULE_1__.getSvgSafeRes)(_theming_icons_base__WEBPACK_IMPORTED_MODULE_2__.arrow_down, this.sanitizer);
    this._overlayVisible$$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(false);
    this._optionsToDisplay$$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject([]);
    this._headerStyle = {};
    this._options = [];
    this._disabled = false;
    this._panelStyle = {
      backgroundColor: 'rgba(1, 1, 1, 0.45)',
      color: '#fff',
      border: '1px solid var(--ngxd-primary-color)',
      borderRadius: '0.2rem',
      boxShadow: '2px 5px 10px rgba(55, 55, 55, 0.8)'
    };
    this.overlayVisible$ = this._overlayVisible$$.asObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.shareReplay)({
      refCount: true,
      bufferSize: 1
    }));
    this.optionsToDisplay$ = this._optionsToDisplay$$.asObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.shareReplay)({
      refCount: true,
      bufferSize: 1
    }));
    this.selectedItemTemplate = null;
    this.selectedOption = null;
    this.selectedItemIndex = 0;
    this.hover = false;
    this.optionsChanged = false;
    this.focused = false;
    this.onModelChange = () => void 0;
    this.onModelTouched = () => void 0;
    // if (ngControl) {
    //   ngControl.valueAccessor = this;
    // }
  }

  onHostFocus() {
    console.log('Focus, prev value :: ', this.prevValue);
  }
  onHostBlur() {
    this.prevValue = this.selectedOption || null;
    console.log('BLUR, prev val :: ', this.prevValue);
  }
  /**
   * @property
   * @param {BasicStylesSet} headStyleObj - styles to override the defaults of Select component panel
   */
  set headerStyle(headStyleObj) {
    if (!!headStyleObj && !!Object.keys(headStyleObj).length) {
      this._headerStyle = Object.assign(Object.assign({}, this._headerStyle), headStyleObj);
    }
  }
  get headerStyle() {
    return this._headerStyle;
  }
  set panelStyle(stylesObj) {
    if (!!stylesObj && !!Object.keys(stylesObj).length) {
      this._panelStyle = Object.assign(Object.assign({}, this._panelStyle), stylesObj);
    }
  }
  get panelStyle() {
    return this._panelStyle;
  }
  // get options(): IOption[] {
  // 	return this._options;
  // }
  set options(val) {
    this._options = val;
    // this.optionsToDisplay = this._options;
    this._optionsToDisplay$$.next(val);
    this.updateSelectedOption();
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(_disabled) {
    if (_disabled) {
      this.focused = false;
      if (this._overlayVisible$$.value) this.hide();
    }
    this._disabled = _disabled;
    if (!this.cd.destroyed) {
      this.cd.detectChanges();
    }
  }
  ngOnChanges(changes) {
    Object.entries(changes).forEach(([changeKey, change]) => {
      if (changeKey === 'templates') {
        if (change.currentValue === change.previousValue) return;
        // if (!change.isFirstChange()) return;
        this.openerBtnTemplate = change.currentValue['openerBtnTemplate'] || this.defaultOpenerTemplate;
        this.itemsListDefaultTmpl = change.currentValue['itemslistTemplate'] || this.itemsListDefaultTmpl;
        this.cd.markForCheck();
      }
    });
  }
  ngAfterContentInit() {
    var _a, _b, _c, _d;
    this.openerBtnTemplate = ((_a = this.templates) === null || _a === void 0 ? void 0 : _a.openerBtnTemplate) ? this.templates.openerBtnTemplate : this.defaultOpenerTemplate;
    this.itemsListDefaultTmpl = ((_b = this.templates) === null || _b === void 0 ? void 0 : _b.itemslistTemplate) ? this.templates.itemslistTemplate : this.itemsListDefaultTmpl;
    if ((_c = this.templates) === null || _c === void 0 ? void 0 : _c.selectedItemTemplate) {
      this.selectedItemTemplate = this.templates.selectedItemTemplate;
    }
    (_d = this.projectedItems) === null || _d === void 0 ? void 0 : _d.forEach(itemCmp => {
      itemCmp.optionClick.subscribe(e => this.onItemClick(e));
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.fromEvent)(document, 'click').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)(ev => {
      var _a, _b;
      const iconContainer = (_b = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.contains('select-trigger-icon');
      if (this.isOutsideClicked(ev) && !iconContainer) {
        this.cd.markForCheck();
        this.hide();
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)(ev);
    })).subscribe();
    // this.updateSelectedOption();
  }

  onInputFocus($event) {
    this.focused = true;
    this.onFocus.emit($event);
  }
  onInputBlur($event) {
    this.focused = false;
    this.onBlur.emit($event);
  }
  get label() {
    var _a, _b;
    return this.selectedOption ? this.getOptionLabel(this.selectedOption) : ((_a = this.placeholder) === null || _a === void 0 ? void 0 : _a.length) ? this.placeholder : ((_b = this.options) === null || _b === void 0 ? void 0 : _b.length) ? this.getOptionLabel(this.options[0]) : null;
  }
  getOptionLabel(option) {
    return (0,_settings_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFieldData)(option, this.optionLabelKey);
  }
  getOptionValue(option) {
    if (!option) return null;
    return (0,_settings_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFieldData)(option);
  }
  isOptionDisabled(option) {
    return (0,_settings_helpers__WEBPACK_IMPORTED_MODULE_1__.isString)(option) ? false : !!(option === null || option === void 0 ? void 0 : option.disabled) || false;
  }
  onItemClick({
    option,
    baseEvent
  }) {
    if (this.readonly) {
      console.log('DropDown is READONLY');
      return;
    }
    if (!option) return;
    if (!this.isOptionDisabled(option)) {
      this.selectItem(baseEvent, option);
    }
    setTimeout(() => {
      this.hide();
    }, 150);
  }
  selectItem($event, option, update = true) {
    // if (this.selectedOption != option) {
    this.selectedOption = option;
    if (update) {
      this.value = this.getOptionValue(option);
      this.onModelChange(this.value);
      this.onChange.emit({
        originalEvent: $event,
        value: this.value
      });
    }
    // }
  }

  writeValue(value) {
    this.value = value;
    this.updateSelectedOption();
    this.cd.markForCheck();
  }
  validate({
    value
  }) {
    if (this.required && !value) return {
      invalid: true
    };
    const isNotValid = this.required && !value && !!_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required(value);
    return isNotValid && {
      invalid: true
    };
  }
  updateSelectedOption() {
    var _a;
    // this.selectedOption = this.findOption(val, this.optionsToDisplay);
    if (!this.placeholder && !this.selectedOption && ((_a = this._optionsToDisplay$$.value) === null || _a === void 0 ? void 0 : _a.length)) {
      this.selectedOption = this._optionsToDisplay$$.value[0];
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  onMouseclick($event) {
    if (this.disabled) {
      return;
    }
    if (!this.readonly) {
      this.onClick.emit($event);
    }
    if (this._overlayVisible$$.value) this.hide();else this.show();
    this.cd.detectChanges();
  }
  reset() {
    this.selectItem(new MouseEvent('click'), null);
  }
  isOutsideClicked(event) {
    return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
  }
  show() {
    var _a;
    this._overlayVisible$$.next(true);
    this.onShow.emit(true);
    if (!this.searchField || !((_a = this._optionsToDisplay$$.value) === null || _a === void 0 ? void 0 : _a.length)) return;
    setTimeout(() => {
      var _a;
      const searchFieldInputEl = (_a = this.el.nativeElement) === null || _a === void 0 ? void 0 : _a.querySelector('.search-term__container .search-term');
      if (!searchFieldInputEl) return;
      searchFieldInputEl === null || searchFieldInputEl === void 0 ? void 0 : searchFieldInputEl.focus();
      (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.fromEvent)(searchFieldInputEl, 'input').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(this.onHide), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.switchMap)($event => (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.of)($event.target.value))).subscribe(searchTerm => {
        var _a;
        return this._optionsToDisplay$$.next(searchTerm.length ? (_a = this._options) === null || _a === void 0 ? void 0 : _a.filter(opt => {
          const optionValue = this.getOptionValue(opt);
          const found = !!(optionValue === null || optionValue === void 0 ? void 0 : optionValue.toLowerCase().includes(searchTerm.toLowerCase()));
          return found;
        }) : this._options);
      });
    });
  }
  hide() {
    this.onHide.emit(false);
    this._overlayVisible$$.next(false);
    this._optionsToDisplay$$.next(this._options);
  }
  onKeydown($event) {
    var _a;
    if (this.isOutsideClicked($event)) {
      console.log('Clicked outside of the component ...');
      return;
    }
    if (this.readonly || !((_a = this._optionsToDisplay$$.value) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }
    switch ($event.key) {
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.ArrowDown:
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Down:
        {
          if (!this._overlayVisible$$.value && $event.altKey) {
            this.show();
          } else {
            this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this._optionsToDisplay$$.value) : -1;
            const nextEnabledOption = this.findNextEnabledOption(this.selectedItemIndex);
            if (nextEnabledOption) {
              this.selectItem($event, nextEnabledOption, false);
            }
          }
          $event.preventDefault();
          break;
        }
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.ArrowUp:
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Up:
        {
          this.selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.getOptionValue(this.selectedOption), this._optionsToDisplay$$.value) : -1;
          const prevEnabledOption = this.findPrevEnabledOption(this.selectedItemIndex);
          if (prevEnabledOption) {
            this.selectItem($event, prevEnabledOption, false);
          }
          $event.preventDefault();
          break;
        }
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Space:
        {
          if (!this._overlayVisible$$.value) {
            this.show();
          } else {
            this.hide();
          }
          $event.preventDefault();
          break;
        }
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Enter:
        {
          this.hide();
          this.prevValue = this.selectedOption;
          this.selectItem($event, this.selectedOption, true);
          $event.preventDefault();
          break;
        }
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Escape:
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Esc:
        {
          this.selectItem($event, this.prevValue);
          this.hide();
          $event.preventDefault();
          break;
        }
      case _settings_helpers__WEBPACK_IMPORTED_MODULE_1__.OptionKeyboardEventHandleKeys.Tab:
        {
          this.hide();
          break;
        }
    }
  }
  findOptionIndex(val, opts) {
    if (!(val === null || val === void 0 ? void 0 : val.trim().length)) return -1;
    if (!(opts === null || opts === void 0 ? void 0 : opts.length)) return -1;
    let index = -1;
    for (let i = 0; i < opts.length; i++) {
      if ((0,_settings_helpers__WEBPACK_IMPORTED_MODULE_1__.areEqual)(val, this.getOptionValue(opts[i]))) {
        index = i;
        break;
      }
    }
    return index;
  }
  findPrevEnabledOption(index) {
    var _a, _b, _c;
    let prevEnabledOption;
    if ((_a = this._optionsToDisplay$$.value) === null || _a === void 0 ? void 0 : _a.length) {
      for (let i = index - 1; 0 <= i; i--) {
        const option = this._optionsToDisplay$$.value[i];
        if (option === null || option === void 0 ? void 0 : option.disabled) {
          continue;
        } else {
          prevEnabledOption = option;
          break;
        }
      }
      if (!prevEnabledOption) {
        for (let i = ((_b = this._optionsToDisplay$$.value) === null || _b === void 0 ? void 0 : _b.length) - 1; i >= index; i--) {
          const option = (_c = this._optionsToDisplay$$.value) === null || _c === void 0 ? void 0 : _c[i];
          if (this.isOptionDisabled(option)) {
            continue;
          } else {
            prevEnabledOption = option;
            break;
          }
        }
      }
    }
    return prevEnabledOption;
  }
  findNextEnabledOption(index) {
    var _a, _b, _c, _d;
    let nextEnabledOption;
    if ((_a = this._optionsToDisplay$$.value) === null || _a === void 0 ? void 0 : _a.length) {
      for (let i = index + 1; i < ((_b = this._optionsToDisplay$$.value) === null || _b === void 0 ? void 0 : _b.length); i++) {
        const option = (_c = this._optionsToDisplay$$.value) === null || _c === void 0 ? void 0 : _c[i];
        if (this.isOptionDisabled(option)) {
          continue;
        } else {
          nextEnabledOption = option;
          break;
        }
      }
      if (!nextEnabledOption) {
        for (let i = 0; i < index; i++) {
          const option = (_d = this._optionsToDisplay$$.value) === null || _d === void 0 ? void 0 : _d[i];
          if (this.isOptionDisabled(option)) {
            continue;
          } else {
            nextEnabledOption = option;
            break;
          }
        }
      }
    }
    return nextEnabledOption;
  }
}
SelectComponent.ɵfac = function SelectComponent_Factory(t) {
  return new (t || SelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone));
};
SelectComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: SelectComponent,
  selectors: [["ngxd-select"]],
  contentQueries: function SelectComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵcontentQuery"](dirIndex, _select_item_component__WEBPACK_IMPORTED_MODULE_0__.SelectItemComponent, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.projectedItems = _t);
    }
  },
  viewQuery: function SelectComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 7, _angular_core__WEBPACK_IMPORTED_MODULE_3__.TemplateRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c1, 7, _angular_core__WEBPACK_IMPORTED_MODULE_3__.TemplateRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.defaultOpenerTemplate = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.itemsListDefaultTmpl = _t.first);
    }
  },
  hostVars: 17,
  hostBindings: function SelectComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("blur", function SelectComponent_blur_HostBindingHandler($event) {
        return ctx.onHostBlur($event);
      })("focus", function SelectComponent_focus_HostBindingHandler($event) {
        return ctx.onHostFocus($event);
      })("keydown", function SelectComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      })("click", function SelectComponent_click_HostBindingHandler($event) {
        return ctx.onMouseclick($event);
      });
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("tabIndex", ctx.tabindex)("autofocus", ctx.autofocus)("name", ctx.name);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleMap"](ctx.headerStyle);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.styleClass);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("wrapper-focus", ctx.focused || ctx.overlayVisible)("select", true)("disabled", ctx.disabled)("focus", ctx.focused || ctx.overlayVisible)("select-open", ctx.overlayVisible);
    }
  },
  inputs: {
    templates: "templates",
    name: "name",
    panelStyleClass: "panelStyleClass",
    styleClass: "styleClass",
    readonly: "readonly",
    required: "required",
    resetBtn: "resetBtn",
    searchField: "searchField",
    autofocus: "autofocus",
    placeholder: "placeholder",
    optionLabelKey: "optionLabelKey",
    selectIconClass: "selectIconClass",
    tabindex: "tabindex",
    itemSize: "itemSize",
    headerStyle: "headerStyle",
    panelStyle: "panelStyle",
    options: "options",
    disabled: "disabled"
  },
  outputs: {
    onChange: "onChange",
    onClick: "onClick",
    onShow: "onShow",
    onHide: "onHide",
    onFocus: "onFocus",
    onBlur: "onBlur"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([SELECT_VALUE_ACCESSOR_PROVIDER, NG_VALIDATORS_PROVIDER]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c7,
  decls: 18,
  vars: 9,
  consts: [[4, "ngIf", "ngIfElse"], ["role", "button", 1, "select-trigger"], [4, "ngIf"], ["class", "select-panel", 3, "ngStyle", "class", 4, "ngIf"], ["NoLabelTmpl", ""], ["selectedItemSelectedTmpl", ""], ["defaultSelectIconTmpl", ""], ["itemsListDefaultTmpl", ""], ["noInputOptionsTmpl", ""], ["searchTermTmpl", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "select-panel", 3, "ngStyle"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["class", "reset", 3, "click", 4, "ngIf"], [4, "ngTemplateOutlet"], [1, "reset", 3, "click"], [3, "ngClass"], [1, "select-trigger-icon", 3, "ngClass"], [1, "select-trigger__default-img", 3, "src"], [1, "select-items-wrapper"], [1, "select-items"], ["ngFor", "", 3, "ngForOf"], [3, "id", "selected", "label", "disabled", "template", "itemSize", "optionClick"], [1, "search-term__container"], [1, "search-term__sub-container"], ["type", "text", "placeholder", "search for an item ...", 1, "search-term", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "search-term__icon"], ["d", "M18.8167 18.0154L12.15 11.8615", "stroke", "#adc9cebf", "stroke-width", "3"], ["d", "M8.33335 13.8461C12.0153 13.8461 15 11.091 15 7.6923C15 4.29362 12.0153 1.53845 8.33335 1.53845C4.65146 1.53845 1.66669 4.29362 1.66669 7.6923C1.66669 11.091 4.65146 13.8461 8.33335 13.8461Z", "stroke", "#adc9cebf", "stroke-width", "3"]],
  template: function SelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"](_c6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, SelectComponent_span_0_Template, 2, 2, "span", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, SelectComponent_ng_container_3_Template, 3, 6, "ng-container", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SelectComponent_div_4_Template, 5, 10, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, SelectComponent_ng_template_6_Template, 2, 4, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, SelectComponent_ng_template_8_Template, 1, 5, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, SelectComponent_ng_template_10_Template, 2, 6, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, SelectComponent_ng_template_12_Template, 4, 3, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, SelectComponent_ng_template_14_Template, 3, 0, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, SelectComponent_ng_template_16_Template, 6, 0, "ng-template", null, 9, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !!ctx.label)("ngIfElse", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("aria-expanded", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 5, ctx.overlayVisible$));
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.openerBtnTemplate);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 7, ctx.overlayVisible$));
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgTemplateOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _select_item_component__WEBPACK_IMPORTED_MODULE_0__.SelectItemComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe],
  styles: ["/*!\n * @ngx-dummy/select-Simple library\n * Simple select created for angular / ionic projects.\n * https://github.com/ngx-dummy/select-simple\n *\n * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>\n * Published under MIT License\n */\n:root {\n  --color-white: #fff;\n  --ngxd-primary-color: #adc9cebf;\n  --ngxd-secondary-color: #0b2424;\n  --ngxd-primary-color-t50: #00556680;\n  --ngxd-disabled: #8a8a8a80;\n  --ngxd-primary-icon-color: #89a5aa40;\n  --ngxd-primary-color--active: rgba(221, 233, 235, 0.7490196078);\n  --ngxd-primary-color--opened: rgba(141, 180, 187, 0.7490196078);\n}\n:host,\n.select {\n  width: max-content;\n  box-sizing: border-box;\n  min-height: 2rem;\n  cursor: pointer;\n  position: relative;\n  -webkit-user-select: none;\n          user-select: none;\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.5rem;\n  background: var(--ngxd-primary-color);\n  border-radius: 3px;\n  border: 1px solid var(--color-white);\n  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;\n}\n:host:not(.disabled):hover,\n.select:not(.disabled):hover {\n  border-color: var(--ngxd-secondary-color);\n}\n:host:not(.disabled).focus,\n.select:not(.disabled).focus {\n  outline-offset: 0;\n  box-shadow: 0 0 0 0.1rem var(--ngxd-secondary-color);\n  border-color: var(--ngxd-primary-color);\n}\n:host:not(.disabled).wrapper-focus,\n.select:not(.disabled).wrapper-focus {\n  box-shadow: none;\n  background-color: var(--ngxd-primary-color-t50);\n  border-color: var(--ngxd-secondary-color);\n  background-size: 100% 2px, 100% 1px;\n}\n:host.disabled,\n.select.disabled {\n  cursor: not-allowed !important;\n  pointer-events: none;\n  color: var(--ngxd-disabled);\n}\n:host .select-trigger,\n.select .select-trigger {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n:host .select-trigger-icon,\n.select .select-trigger-icon {\n  display: grid;\n  place-content: center;\n  color: var(--ngxd-primary-color);\n  border-radius: 50%;\n  background-color: var(--ngxd-primary-icon-color);\n}\n:host .select-trigger-icon.open,\n.select .select-trigger-icon.open {\n  transform: rotate(180deg);\n  transition: transform 0.1s ease-out;\n}\n:host .select-trigger-icon.close,\n.select .select-trigger-icon.close {\n  transform: rotate(0);\n  transition: transform 0.1s ease-out;\n}\n:host .select-trigger__default-img,\n.select .select-trigger__default-img {\n  max-width: 2rem;\n}\n:host .select-label,\n.select .select-label {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  flex: 1 1 auto;\n  width: 1%;\n  text-overflow: ellipsis;\n  cursor: pointer;\n}\n:host .select-label-empty,\n.select .select-label-empty {\n  overflow: hidden;\n  visibility: hidden;\n}\n:host .select-panel,\n.select .select-panel {\n  height: auto;\n  min-width: 100%;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  padding: 0.5rem;\n  transition: all 0.3s ease;\n  z-index: 1;\n}\n:host .select-panel .select-items-wrapper,\n.select .select-panel .select-items-wrapper {\n  overflow: auto;\n  width: 100%;\n}\n:host .select-panel .select-items,\n.select .select-panel .select-items {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n:host .select-panel .select-items .select-item,\n.select .select-panel .select-items .select-item {\n  cursor: pointer;\n  font-weight: normal;\n  white-space: nowrap;\n  position: relative;\n  overflow: hidden;\n  margin: 0.1rem;\n}\n:host .select-panel .select-items .select-item.item-highlight,\n.select .select-panel .select-items .select-item.item-highlight {\n  background-color: var(--ngxd-primary-color--opened);\n  color: var(#0b2424);\n}\n:host .select-panel .select-items .select-item:hover,\n.select .select-panel .select-items .select-item:hover {\n  background-color: var(-ngxd-primary-color-t50);\n  color: var(--ngxd-secondary-color);\n}\n:host .select-panel .search-term__container,\n.select .select-panel .search-term__container {\n  padding: 0.75rem 1.25rem;\n  border: none;\n  border-bottom: 1px solid var(--color-white);\n  color: var(--ngxd-secondary-color);\n  background: transparent;\n  margin: 0;\n  border-top-right-radius: 6px;\n  border-top-left-radius: 6px;\n}\n:host .select-panel .search-term__container .search-term__sub-container,\n.select .select-panel .search-term__container .search-term__sub-container {\n  position: relative;\n}\n:host .select-panel .search-term__container .search-term__sub-container .search-term,\n.select .select-panel .search-term__container .search-term__sub-container .search-term {\n  margin: 0.1rem;\n  background-color: transparent;\n  font-size: 1.2rem;\n  background: transparent;\n  padding: 0.75rem 0.75rem;\n  border: 1px solid #ced4da;\n  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;\n  -webkit-appearance: none;\n          appearance: none;\n  border-radius: 6px;\n  color: var(--ngxd-primary-color);\n}\n:host .select-panel .search-term__container .search-term__sub-container .search-term__icon,\n.select .select-panel .search-term__container .search-term__sub-container .search-term__icon {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 1rem;\n}\n:host .select-panel .reset,\n.select .select-panel .reset {\n  border: none;\n  outline: 0;\n  text-decoration: none;\n  font-size: 100%;\n  list-style: none;\n  margin-top: 0.5rem;\n  padding: 0.4rem 2rem;\n  width: 100%;\n  display: grid;\n  place-content: center;\n  border-radius: 0.2rem;\n  background-color: var(--ngxd-primary-color);\n}\n@keyframes fadein {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRoZW1pbmdcXHZhcnMuc2NzcyIsInNlbGVjdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztFQUFBO0FBaUJBO0VBQ0MsbUJBQUE7RUFDQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsbUNBQUE7RUFDQSwwQkFBQTtFQUNBLG9DQUFBO0VBQ0EsK0RBQUE7RUFDQSwrREFBQTtBQ1JEO0FBZkE7O0VBRUMsa0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSxpRkFBQTtBQWtCRDtBQWZFOztFQUNDLHlDQUFBO0FBa0JIO0FBZkU7O0VBQ0MsaUJBQUE7RUFDQSxvREFBQTtFQUNBLHVDQUFBO0FBa0JIO0FBZkU7O0VBQ0MsZ0JBQUE7RUFDQSwrQ0FBQTtFQUNBLHlDQUFBO0VBQ0EsbUNBQUE7QUFrQkg7QUFkQzs7RUFDQyw4QkFBQTtFQUNBLG9CQUFBO0VBQ0EsMkJBQUE7QUFpQkY7QUFkQzs7RUFDQyxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7QUFpQkY7QUFkRTs7RUFHQyxhQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0RBQUE7QUFlSDtBQWJFOztFQUNDLHlCQUFBO0VBQ0EsbUNBQUE7QUFnQkg7QUFiRTs7RUFDQyxvQkFBQTtFQUNBLG1DQUFBO0FBZ0JIO0FBZEU7O0VBQ0MsZUFBQTtBQWlCSDtBQWJDOztFQUNDLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7QUFnQkY7QUFkRTs7RUFDQyxnQkFBQTtFQUNBLGtCQUFBO0FBaUJIO0FBYkM7O0VBQ0MsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsVUFBQTtBQWdCRjtBQWRFOztFQUNDLGNBQUE7RUFDQSxXQUFBO0FBaUJIO0FBZEU7O0VBQ0MsU0FBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtBQWlCSDtBQWZHOztFQUNDLGVBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFrQko7QUFoQkk7O0VBQ0MsbURBQUE7RUFDQSxtQkFBQTtBQW1CTDtBQWpCSTs7RUFDQyw4Q0FBQTtFQUNBLGtDQUFBO0FBb0JMO0FBZkU7O0VBQ0Msd0JBQUE7RUFDQSxZQUFBO0VBQ0EsMkNBQUE7RUFDQSxrQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLDRCQUFBO0VBQ0EsMkJBQUE7QUFrQkg7QUFoQkc7O0VBQ0Msa0JBQUE7QUFtQko7QUFqQkk7O0VBR0MsY0FBQTtFQUNBLDZCQUFBO0VBQ0EsaUJBQUE7RUFDQSx1QkFBQTtFQUNBLHdCQUFBO0VBQ0EseUJBQUE7RUFDQSxpRkFBQTtFQUNBLHdCQUFBO1VBQUEsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0FBa0JMO0FBZkk7O0VBQ0Msa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7RUFDQSxXQUFBO0FBa0JMO0FBYkU7O0VBQ0MsWUFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSwyQ0FBQTtBQWdCSDtBQUpDO0VBQ0M7SUFDQyxVQUFBO0VBY0Q7RUFaQTtJQUNDLFVBQUE7RUFjRDtBQUNGIiwiZmlsZSI6InNlbGVjdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBAbmd4LWR1bW15L3NlbGVjdC1TaW1wbGUgbGlicmFyeVxyXG4gKiBTaW1wbGUgc2VsZWN0IGNyZWF0ZWQgZm9yIGFuZ3VsYXIgLyBpb25pYyBwcm9qZWN0cy5cclxuICogaHR0cHM6Ly9naXRodWIuY29tL25neC1kdW1teS9zZWxlY3Qtc2ltcGxlXHJcbiAqXHJcbiAqIENvcHlyaWdodCAgVmxhZGltaXIgT3ZzeXVrb3YgPG92c3l1a292QHlhbmRleC5jb20+XHJcbiAqIFB1Ymxpc2hlZCB1bmRlciBNSVQgTGljZW5zZVxyXG4gKi9cclxuJHdoaXRlOiAjZmZmO1xyXG4kY29sb3ItcHJpbWFyeTogI2FkYzljZWJmO1xyXG4kY29sb3ItcHJpbWFyeS10NTA6ICMwMDU1NjY4MDtcclxuJGNvbG9yLWljb24tcHJpbWFyeTogIzg5YTVhYTQwO1xyXG4kY29sb3Itc2Vjb25kYXJ5OiAjMGIyNDI0O1xyXG4kY29sb3ItZGlzYWJsZWQ6ICM4YThhOGE4MDtcclxuJGl0ZW0taGVhZGVyX19iZy0tYWN0aXZlOiBsaWdodGVuKCRjb2xvci1wcmltYXJ5LCAxNSUpO1xyXG4kaXRlbS1oZWFkZXJfX2JnLS1vcGVuZWQ6IGRhcmtlbigkY29sb3ItcHJpbWFyeSwgMTAlKTtcclxuXHJcbjpyb290IHtcclxuXHQtLWNvbG9yLXdoaXRlOiAjeyR3aGl0ZX07XHJcblx0LS1uZ3hkLXByaW1hcnktY29sb3I6ICN7JGNvbG9yLXByaW1hcnl9O1xyXG5cdC0tbmd4ZC1zZWNvbmRhcnktY29sb3I6ICN7JGNvbG9yLXNlY29uZGFyeX07XHJcblx0LS1uZ3hkLXByaW1hcnktY29sb3ItdDUwOiAjeyRjb2xvci1wcmltYXJ5LXQ1MH07XHJcblx0LS1uZ3hkLWRpc2FibGVkOiAjeyRjb2xvci1kaXNhYmxlZH07XHJcblx0LS1uZ3hkLXByaW1hcnktaWNvbi1jb2xvcjogI3skY29sb3ItaWNvbi1wcmltYXJ5fTtcclxuXHQtLW5neGQtcHJpbWFyeS1jb2xvci0tYWN0aXZlOiAjeyRpdGVtLWhlYWRlcl9fYmctLWFjdGl2ZX07XHJcblx0LS1uZ3hkLXByaW1hcnktY29sb3ItLW9wZW5lZDogI3skaXRlbS1oZWFkZXJfX2JnLS1vcGVuZWR9O1xyXG59XHJcbiIsIkBpbXBvcnQgJy4vdGhlbWluZy92YXJzLnNjc3MnO1xyXG5cclxuOmhvc3QsXHJcbi5zZWxlY3Qge1xyXG5cdHdpZHRoOiBtYXgtY29udGVudDtcclxuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cdG1pbi1oZWlnaHQ6IDJyZW07XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHR1c2VyLXNlbGVjdDogbm9uZTtcclxuXHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xyXG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdGdhcDogMXJlbTtcclxuXHRwYWRkaW5nOiAwLjVyZW07XHJcblx0YmFja2dyb3VuZDogdmFyKC0tbmd4ZC1wcmltYXJ5LWNvbG9yKTtcclxuXHRib3JkZXItcmFkaXVzOiAzcHg7XHJcblx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3Itd2hpdGUpO1xyXG5cdHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycywgY29sb3IgMC4ycywgYm9yZGVyLWNvbG9yIDAuMnMsIGJveC1zaGFkb3cgMC4ycztcclxuXHJcblx0Jjpub3QoLmRpc2FibGVkKSB7XHJcblx0XHQmOmhvdmVyIHtcclxuXHRcdFx0Ym9yZGVyLWNvbG9yOiB2YXIoLS1uZ3hkLXNlY29uZGFyeS1jb2xvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji5mb2N1cyB7XHJcblx0XHRcdG91dGxpbmUtb2Zmc2V0OiAwO1xyXG5cdFx0XHRib3gtc2hhZG93OiAwIDAgMCAwLjFyZW0gdmFyKC0tbmd4ZC1zZWNvbmRhcnktY29sb3IpO1xyXG5cdFx0XHRib3JkZXItY29sb3I6IHZhcigtLW5neGQtcHJpbWFyeS1jb2xvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ji53cmFwcGVyLWZvY3VzIHtcclxuXHRcdFx0Ym94LXNoYWRvdzogbm9uZTtcclxuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbmd4ZC1wcmltYXJ5LWNvbG9yLXQ1MCk7XHJcblx0XHRcdGJvcmRlci1jb2xvcjogdmFyKC0tbmd4ZC1zZWNvbmRhcnktY29sb3IpO1xyXG5cdFx0XHRiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMnB4LCAxMDAlIDFweDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdCYuZGlzYWJsZWQge1xyXG5cdFx0Y3Vyc29yOiBub3QtYWxsb3dlZCAhaW1wb3J0YW50O1xyXG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XHJcblx0XHRjb2xvcjogdmFyKC0tbmd4ZC1kaXNhYmxlZCk7XHJcblx0fVxyXG5cclxuXHQuc2VsZWN0LXRyaWdnZXIge1xyXG5cdFx0ZGlzcGxheTogZmxleDtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdGZsZXgtc2hyaW5rOiAwO1xyXG5cdFx0Ly8gbWFyZ2luOiAwLjFyZW07XHJcblxyXG5cdFx0Ji1pY29uIHtcclxuXHRcdFx0Ly8gbWFyZ2luOiAwLjFyZW0gMC4ycmVtO1xyXG5cdFx0XHQvLyBwYWRkaW5nOiAwLjFyZW07XHJcblx0XHRcdGRpc3BsYXk6IGdyaWQ7XHJcblx0XHRcdHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdFx0Y29sb3I6IHZhcigtLW5neGQtcHJpbWFyeS1jb2xvcik7XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6IDUwJTtcclxuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbmd4ZC1wcmltYXJ5LWljb24tY29sb3IpO1xyXG5cdFx0fVxyXG5cdFx0Ji1pY29uLm9wZW4ge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG5cdFx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4xcyBlYXNlLW91dDtcclxuXHRcdH1cclxuXHJcblx0XHQmLWljb24uY2xvc2Uge1xyXG5cdFx0XHR0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcclxuXHRcdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMXMgZWFzZS1vdXQ7XHJcblx0XHR9XHJcblx0XHQmX19kZWZhdWx0LWltZyB7XHJcblx0XHRcdG1heC13aWR0aDogMnJlbTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5zZWxlY3QtbGFiZWwge1xyXG5cdFx0ZGlzcGxheTogYmxvY2s7XHJcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHRcdGZsZXg6IDEgMSBhdXRvO1xyXG5cdFx0d2lkdGg6IDElO1xyXG5cdFx0dGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcblx0XHRjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG5cdFx0Ji1lbXB0eSB7XHJcblx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdHZpc2liaWxpdHk6IGhpZGRlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC5zZWxlY3QtcGFuZWwge1xyXG5cdFx0aGVpZ2h0OiBhdXRvO1xyXG5cdFx0bWluLXdpZHRoOiAxMDAlO1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAxMDAlO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdHBhZGRpbmc6IDAuNXJlbTtcclxuXHRcdHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcblx0XHR6LWluZGV4OiAxO1xyXG5cclxuXHRcdC5zZWxlY3QtaXRlbXMtd3JhcHBlciB7XHJcblx0XHRcdG92ZXJmbG93OiBhdXRvO1xyXG5cdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdH1cclxuXHJcblx0XHQuc2VsZWN0LWl0ZW1zIHtcclxuXHRcdFx0bWFyZ2luOiAwO1xyXG5cdFx0XHRwYWRkaW5nOiAwO1xyXG5cdFx0XHRsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcblxyXG5cdFx0XHQuc2VsZWN0LWl0ZW0ge1xyXG5cdFx0XHRcdGN1cnNvcjogcG9pbnRlcjtcclxuXHRcdFx0XHRmb250LXdlaWdodDogbm9ybWFsO1xyXG5cdFx0XHRcdHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcblx0XHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHRcdFx0bWFyZ2luOiAwLjFyZW07XHJcblxyXG5cdFx0XHRcdCYuaXRlbS1oaWdobGlnaHQge1xyXG5cdFx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbmd4ZC1wcmltYXJ5LWNvbG9yLS1vcGVuZWQpO1xyXG5cdFx0XHRcdFx0Y29sb3I6IHZhcigkY29sb3Itc2Vjb25kYXJ5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Jjpob3ZlciB7XHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLW5neGQtcHJpbWFyeS1jb2xvci10NTApO1xyXG5cdFx0XHRcdFx0Y29sb3I6IHZhcigtLW5neGQtc2Vjb25kYXJ5LWNvbG9yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQuc2VhcmNoLXRlcm1fX2NvbnRhaW5lciB7XHJcblx0XHRcdHBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTtcclxuXHRcdFx0Ym9yZGVyOiBub25lO1xyXG5cdFx0XHRib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tY29sb3Itd2hpdGUpO1xyXG5cdFx0XHRjb2xvcjogdmFyKC0tbmd4ZC1zZWNvbmRhcnktY29sb3IpO1xyXG5cdFx0XHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxuXHRcdFx0bWFyZ2luOiAwO1xyXG5cdFx0XHRib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xyXG5cdFx0XHRib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XHJcblxyXG5cdFx0XHQuc2VhcmNoLXRlcm1fX3N1Yi1jb250YWluZXIge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcblx0XHRcdFx0LnNlYXJjaC10ZXJtIHtcclxuXHRcdFx0XHRcdC8vIHdpZHRoOiAxMDAlO1xyXG5cdFx0XHRcdFx0Ly8gaGVpZ2h0OiAxMDAlO1xyXG5cdFx0XHRcdFx0bWFyZ2luOiAwLjFyZW07XHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuXHRcdFx0XHRcdGZvbnQtc2l6ZTogMS4ycmVtO1xyXG5cdFx0XHRcdFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiAwLjc1cmVtIDAuNzVyZW07XHJcblx0XHRcdFx0XHRib3JkZXI6IDFweCBzb2xpZCAjY2VkNGRhO1xyXG5cdFx0XHRcdFx0dHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzLCBjb2xvciAwLjJzLCBib3JkZXItY29sb3IgMC4ycywgYm94LXNoYWRvdyAwLjJzO1xyXG5cdFx0XHRcdFx0YXBwZWFyYW5jZTogbm9uZTtcclxuXHRcdFx0XHRcdGJvcmRlci1yYWRpdXM6IDZweDtcclxuXHRcdFx0XHRcdGNvbG9yOiB2YXIoLS1uZ3hkLXByaW1hcnktY29sb3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0LnNlYXJjaC10ZXJtX19pY29uIHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRcdHRvcDogNTAlO1xyXG5cdFx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG5cdFx0XHRcdFx0cmlnaHQ6IDFyZW07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0LnJlc2V0IHtcclxuXHRcdFx0Ym9yZGVyOiBub25lO1xyXG5cdFx0XHRvdXRsaW5lOiAwO1xyXG5cdFx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblx0XHRcdGZvbnQtc2l6ZTogMTAwJTtcclxuXHRcdFx0bGlzdC1zdHlsZTogbm9uZTtcclxuXHRcdFx0bWFyZ2luLXRvcDogMC41cmVtO1xyXG5cdFx0XHRwYWRkaW5nOiAwLjRyZW0gMnJlbTtcclxuXHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdGRpc3BsYXk6IGdyaWQ7XHJcblx0XHRcdHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcclxuXHRcdFx0Ym9yZGVyLXJhZGl1czogMC4ycmVtO1xyXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1uZ3hkLXByaW1hcnktY29sb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XHJcblx0XHQwJSB7XHJcblx0XHRcdG9wYWNpdHk6IDA7XHJcblx0XHR9XHJcblx0XHQxMDAlIHtcclxuXHRcdFx0b3BhY2l0eTogMTtcclxuXHRcdH1cclxuXHR9XHJcblx0QGtleWZyYW1lcyBmYWRlaW4ge1xyXG5cdFx0MCUge1xyXG5cdFx0XHRvcGFjaXR5OiAwO1xyXG5cdFx0fVxyXG5cdFx0MTAwJSB7XHJcblx0XHRcdG9wYWNpdHk6IDE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ== */"],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 3645:
/*!************************************************************!*\
  !*** ./packages/select-simple/src/lib/settings/helpers.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OptionKeyboardEventHandleKeys": () => (/* binding */ OptionKeyboardEventHandleKeys),
/* harmony export */   "areEqual": () => (/* binding */ areEqual),
/* harmony export */   "blobToSafeRes": () => (/* binding */ blobToSafeRes),
/* harmony export */   "getPngSafeRes": () => (/* binding */ getPngSafeRes),
/* harmony export */   "getSvgSafeRes": () => (/* binding */ getSvgSafeRes),
/* harmony export */   "imgBase64ToBlob": () => (/* binding */ imgBase64ToBlob),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isSelectItem": () => (/* binding */ isSelectItem),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isValue": () => (/* binding */ isValue),
/* harmony export */   "prepRes": () => (/* binding */ prepRes),
/* harmony export */   "resolveFieldData": () => (/* binding */ resolveFieldData),
/* harmony export */   "sanitizeHTML": () => (/* binding */ sanitizeHTML),
/* harmony export */   "svgToBase64src": () => (/* binding */ svgToBase64src)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/*!
 * @ngx-dummy/select-Simple library
 * Simple select created for angular / ionic projects.
 * https://github.com/ngx-dummy/select-simple
 *
 * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>
 * Published under MIT License
 */

const imgBase64ToBlob = (Base64Image, imageType = 'image/png') => {
    const parts = Base64Image.split(';base64,');
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
};
const svgToBase64src = (rawSvg) => 'data:image/svg+xml;base64,' + btoa(rawSvg);
const prepRes = (item, sanitizer) => sanitizer.bypassSecurityTrustResourceUrl(item);
const sanitizeHTML = (item, sanitizer) => sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__.SecurityContext.HTML, item);
const getSvgSafeRes = (file, sanitizer) => prepRes(svgToBase64src(file), sanitizer);
const getPngSafeRes = (file, sanitizer) => prepRes(URL.createObjectURL(imgBase64ToBlob(file)), sanitizer);
const blobToSafeRes = (blob, sanitizer) => prepRes(URL.createObjectURL(blob), sanitizer);
/**
 *
 * @param data - option value (could be simple string or complex object to resolve)
 * @param field - the key (or complex lookup object key) of data object to resolve value by
 * @returns resolved single option value (Input for SelectItem)
 */
const resolveFieldData = (data, field) => {
    if (isEmpty(data))
        return null;
    if (isString(data))
        return data;
    if (isSelectItem(data)) {
        if (data['label'])
            return data['label'];
        if (data['value'])
            data = data['value'];
    }
    if (field) {
        if (isString(field) && field.indexOf('.') === -1) {
            return data[field];
        }
        else if (isString(field)) {
            const fields = field.split('.');
            let value = data;
            for (let i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return resolveFieldData(value);
        }
    }
    else {
        return resolveFieldData(Object.values(data)[0]);
    }
    return null;
};
const isValue = (obj) => obj !== undefined && obj !== null;
const isEmpty = (obj) => !isValue(obj);
const isString = (obj) => typeof obj === 'string';
const isObject = (obj) => typeof obj !== 'string' && !Array.isArray(obj) && typeof obj === 'object';
const isSelectItem = (obj) => (isObject(obj) && !!obj.value) || !!obj.label;
const areEqual = (obj1, obj2, field) => {
    if (isEmpty(obj1) || isEmpty(obj2))
        return false;
    if (isString(obj1) && isString(obj2))
        return obj1 === obj2;
    if (field)
        return resolveFieldData(obj1, field) === resolveFieldData(obj2, field);
    return JSON.stringify(obj1) === JSON.stringify(obj2);
};
var OptionKeyboardEventHandleKeys;
(function (OptionKeyboardEventHandleKeys) {
    OptionKeyboardEventHandleKeys["ArrowDown"] = "ArrowDown";
    OptionKeyboardEventHandleKeys["Down"] = "Down";
    OptionKeyboardEventHandleKeys["ArrowUp"] = "ArrowUp";
    OptionKeyboardEventHandleKeys["Enter"] = "Enter";
    OptionKeyboardEventHandleKeys["Escape"] = "Escape";
    OptionKeyboardEventHandleKeys["Esc"] = "Esc";
    OptionKeyboardEventHandleKeys["Up"] = "Up";
    OptionKeyboardEventHandleKeys["Tab"] = "Tab";
    OptionKeyboardEventHandleKeys["Space"] = " ";
})(OptionKeyboardEventHandleKeys || (OptionKeyboardEventHandleKeys = {}));


/***/ }),

/***/ 8638:
/*!**************************************************************!*\
  !*** ./packages/select-simple/src/lib/theming/icons-base.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrow_down": () => (/* binding */ arrow_down)
/* harmony export */ });
/*!
 * @ngx-dummy/select-Simple library
 * Simple select created for angular / ionic projects.
 * https://github.com/ngx-dummy/select-simple
 *
 * Copyright  Vladimir Ovsyukov <ovsyukov@yandex.com>
 * Published under MIT License
 */
const arrow_down = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#454" width="48px" height="48px"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>';


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(8587)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map