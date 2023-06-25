/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontSize: {
				body_1: '13px',
			},
			fontWeight: {
				body_1: '400',
			},
			colors: {
				body_1: '#000',
			},
			backgroundColor: {
				container: '#F3F6F9',
				buttons: '#180A29',
			},
			borderColor: {
				buttons: '#180A29',
			},
		},
	},
	plugins: [],
};
