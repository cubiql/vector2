# @cubiql/vector2

This library is a TypeScript library that provides Vector operations and AABB. It supports functions such as creation of 2D vectors, operations (addition, subtraction, inner
product, outer product, etc.), and AABB contains check.

## Installation

```bash
npm install @cubiql/vector2
```

## Usage examples

```js
import {Point} from '@cubiql/vector2';

const v1 = new Point(1, 2);
const v2 = new Point(3, 4);
const sum = v1.add(v2); // (4, 6)
```

## License

MIT
