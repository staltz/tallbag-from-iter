# tallbag-from-iter

Convert a JS Iterable or Iterator to a tallbag pullable source (it only sends data when requested).

`npm install tallbag-from-iter`

## example

Convert an Iterable:

```js
const fromIter = require('tallbag-from-iter');
const iterate = require('callbag-iterate');

const source = fromIter([10, 20, 30, 40]);

iterate(x => console.log(x))(source);   // 10
                                        // 20
                                        // 30
                                        // 40
```

Convert an Iterator:

```js
const fromIter = require('tallbag-from-iter');
const iterate = require('callbag-iterate');

const source = fromIter([10, 20, 30, 40].entries());

iterate(x => console.log(x))(source); // [0,10]
                                      // [1,20]
                                      // [2,30]
                                      // [3,40]
```
