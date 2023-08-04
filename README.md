# eslint-plugin-optional-params

A ESLint plugin that allows you to limit the number of optional params a function may have.
Works with:
- function declarations
- function expressions
- arrow functions
- class methods
- class properties (class methods declared as arrow functions)
- function type declarations
- function declarations within interfaces
- arrow function declarations within interfaces
- abstract methods
- abstract properties (abstract methods declared as arrow functions)

## Installation
```bash
npm i -D eslint-plugin-optional-params
```

## Usage
```js
// .eslintrc.js
module.exports = {
	// ...

	// The 'eslint-plugin' part of the name can be omitted here.
	// Either 'eslint-plugin-optional-params' or just 'optional-params' must be used.
	plugins: [/* other plugins */, 'optional-params']
	rules: {
		// ...

		// The part before the slash must match the name that was used in the 'plugins' array.
		// The second element of the array stands for the maximum optional params count.
		'optional-params/max-optional-params': ['error', 2],
	}

	// ...
}
```
