<center>
  <a href="https://www.npmjs.com/package/@ngx-dummy/select-simple" target="_blank">
    <p align="center">
      <img src="https://avatars3.githubusercontent.com/u/62136587?s=400&u=4580be0183d1496d982253d3a0d803de82465626&v=4" width="200" height="200" />
    </p>
  </a>
  <h2 align="center"><b style="color: teal;"><a href="https://www.npmjs.com/package/@ngx-dummy/select-simple" target="_blank">@Ngx-dummy/Select-simple</a></b> <i>library</i></h2>

[![npm version](https://badge.fury.io/js/@ngx-dummy%2Fselect-simple.svg?style=flat-square)](https://badge.fury.io/js/@ngx-dummy%2Fselect-simple)

</center>

[![GitHub license](https://img.shields.io/github/license/ngx-dummy/select-simple?style=flat-square)](https://github.com/ngx-dummy/select-simple/blob/main/LICENSE)

[![npm-deploy](https://github.com/ngx-dummy/select-simple/actions/workflows/npm-deploy.yml/badge.svg)](https://github.com/ngx-dummy/select-simple/actions/workflows/npm-deploy.yml)

[![GitHub issues](https://img.shields.io/github/issues/ngx-dummy/select-simple?style=flat-square)](https://github.com/ngx-dummy/select-simple/issues)
[![GitHub forks](https://img.shields.io/github/forks/ngx-dummy/select-simple?style=flat-square)](https://github.com/ngx-dummy/select-simple/network)
[![GitHub stars](https://img.shields.io/github/stars/ngx-dummy/select-simple?style=flat-square)](https://github.com/ngx-dummy/select-simple/stargazers)
[![GitHub Release](https://badgen.net/github/release/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/releases)
[![GitHub Branches](https://badgen.net/github/branches/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/branches)
[![GitHub Tags](https://badgen.net/github/tags/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/tags)
[![GitHub Issues](https://badgen.net/github/issues/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/issues)
[![GitHub Forks](https://badgen.net/github/forks/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/network/members)
[![GitHub Status](https://badgen.net/github/status/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/network/members)
[![size](https://badgen.net/packagephobia/publish/@ngx-dummy/select-simple)](https://bundlephobia.com/result?p=ngx-dummy/select-simple)
[![Npm downloads](https://badgen.net/npm/dt/@ngx-dummy/select-simple)](https://www.npmjs.com/package/@ngx-dummy/select-simple)
[![GitHub monthly downloads](https://badgen.net/npm/dm/@ngx-dummy/select-simple)](https://www.npmjs.com/package/@ngx-dummy/select-simple)

[![](https://data.jsdelivr.com/v1/package/npm/@ngx-dummy/select-simple/badge?style=flat-square)](https://www.jsdelivr.com/package/npm/@ngx-dummy/select-simple)

<!--

[![Twitter](https://img.shields.io/twitter/url?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fngx-dummy%2Fselect-simple) -->

[![Donations](https://img.shields.io/badge/Donate-PayPal-green.svg?style=flat-square)](https://paypal.me/ovsyukov)

[![Twitter Follow](https://img.shields.io/twitter/follow/OvsyukovV.svg?style=social)](https://twitter.com/OvsyukovV)

---

## Features

This is an Angular "version" of html [select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) element (which could hardly be styled / templated ... hence the library)

- :gear: **Completely customizable:** you can change the colors, styles ...
- :pencil2: **Create your own templates:** create your own Options' templates
- :ok_hand: **You can use right away:** there are basic items styles included
- :rocket: **No extra deps:** depends only on `@angular/core / @angular/common`
- :satellite: **Options' Elements object bindings** data-bind `Option`s to **_string_** of complex objects

<br/>

## Install

### Yarn

```bash
yarn add @ngx-dummy/select-simple
```

<details closed>
<summary>With Npm</summary>

```bash
npm install -save @ngx-dummy/select-simple@0.0.5-v9
```

</details>

<br/>

## Usage

### See the sample app setup [Stackblitz](https://stackblitz.com/edit/ngx-dummyselect-simple-tester?file=src/app/app.component.html)

[![Using @ngx-dummy/select-simple](https://user-images.githubusercontent.com/969302/140906480-cc2b597d-7ac2-4c12-b752-61b8ba1c704b.png)](https://stackblitz.com/edit/ngx-dummyselect-simple-tester?file=src/app/app.component.html)

<br />

### samples

```ts
import { SelectSimpleModule } from '@ngx-dummy/select-simple';

@NgModule({
	imports: [SelectSimpleModule],
})
export class AppModule {}
```

#### with `Options` (Array of Strings) binding:

```html
<ngxd-select id="select1" [options]="options" [readonly]="false" [required]="true" [none]="true" formControlName="selector" placeholder="Select a City"></ngxd-select>
```

```ts
//... options as simple strings
options = ['opt1', 'opt2', 'opt2'];
//...
```

<br />

#### with `Options` (Array of Strings) binding:

```html
<ngxd-select id="select1" [options]="options" [readonly]="false" [required]="true" [none]="true" formControlName="selector" placeholder="Select a City" optionLabelKey="name"></ngxd-select>
```

```ts
//... Select-items's Captions resolved by `optionLabelKey` param
options = [{ name: 'opt1' , value: { param1: 'para1', param2: 'para2' } }, ...];
//...
```

<br />

#### with `Options` (Array of Strings) binding:

```html
<ngxd-select id="select1" [options]="options" [readonly]="false" [required]="true" [none]="true" formControlName="selector" placeholder="Select a City" optionLabelKey="name"></ngxd-select>
```

```ts
//... Select-items's Captions resolved by `optionLabelKey` param
options = [{ name: 'opt1' , value: { param1: 'para1', param2: 'para2' } }, ...];
//...
```

<br />

#### and `Option` are declared directly:

```html
<ngxd-select id="select1" [options]="options" [readonly]="false" [required]="true" [none]="true" formControlName="selector" placeholder="Select a City" optionLabelKey="name">
	<ngxd-select-item [label]="'Option 1'" [option]="'Opt1'" (onClick)="selected = $event"></ngxd-select-item>
</ngxd-select>
```

```ts
//...
selected = undefined;
//...
```

<br />

<details>
<summary>More detailed showcase (the video clip demonstrates most of use cases of the library)</summary>
<center>

[![Using @ngx-dummy/select-simple](https://raw.githubusercontent.com/ngx-dummy/select-simple/v9/docs/Select-simple-usage.png)](https://vimeo.com/579375725/749b80e96c)

</center>

</details>

<br/>

<br />
<br />

---

<br />
<br />

## Versioning

supports Angular 11 - 13.

 <details>
 <summary>-*v9</summary>
`@ngx-dummy/select-simple` versioned `*-v9` supports Angular 9 - 11.
 </details>

<br />

## Browser Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                   | Edge versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

<br />

## To support my work, maybe ..👏 🍭 :

<a href="https://www.buymeacoffee.com/vovan_super" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-green.png" alt="Buy Me A Coffee" height="40" width="140" style="border-radius: 5px;"></a>

<br/>

---

<br/>

<details closed>
<summary>Other projects:</summary>

|     Name      |                    URL                     |
| :-----------: | :----------------------------------------: |
| **Accordion Simple** | *https://github.com/ngx-dummy/accordion-simple* |

</details>

<br/>

---

<br />

#### Usage

Licensed under
[![GitHub license](https://img.shields.io/github/license/ngx-dummy/select-simple)](https://github.com/ngx-dummy/select-simple/blob/main/LICENSE)

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
\_Copyright (c) belongs to Vladimir Ovsyukov <<ovsyukov@yandex.com>>
