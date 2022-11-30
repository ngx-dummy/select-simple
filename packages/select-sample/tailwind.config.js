const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				lightBg: 'var(--light)',
				mediumBg: 'var(--medium-bg)',
				darkBg: 'var(--dark-bg)',
				lightBlue: 'var(--light-blue-color)',
				yellowBlue: 'var(--yellow-color)',
				darker: 'var(--darker-color)',
				itemColor: 'var(--item-color)',
				accent: 'var(--accent-color)',
				warn: 'var(--warn-color)',
				lightWarn: 'var(--light-warn-color)',
				darkBlue: 'var(--dark-blue-color)',
			},
		},
	},
	plugins: [],
};
