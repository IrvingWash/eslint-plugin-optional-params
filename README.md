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

## Rules
- `max-optional-params`: controls the count of optional params a function may have.
  - Example:
    ```ts
		// 'optional-params/max-optional-params': ['error', 1]

    // ❌
    // Only 1 optional param(s) are allowed (eslint)
    function buildMech(head: Head, core: Core, arms?: Arm[], legs?: Leg[]): Mech

    // ✅
    // A fix
    function buildMech(params: { head: Head, core: Core, arms?: Arm[], legs?: Leg[] }): Mech
    ```
  - When to use it:  
    The rule must be used if multiple optional params are dissatisfactory.  
    To pass a succeeding optional param a redundant `undefined` value should be passed as an argument for the preceding param.


## Usage
- The plugin must be added to the `plugins` array in a `.eslintrc.*` config.
- the `eslint-plugin` part of the name can be omitted.
```js
// .eslintrc.js
module.exports = {
  // ...
  plugins: [/* other plugins */, 'optional-params']
  rules: {
    // ...
    'optional-params/max-optional-params': ['error', 2],
  }
  // ...
}
```
