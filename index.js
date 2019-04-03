const makeShadow = require('shadow-callbag').default;

const fromIter = iter => (start, sink) => {
  if (start !== 0) return;
  const iterator =
    typeof Symbol !== 'undefined' && iter[Symbol.iterator]
      ? iter[Symbol.iterator]()
      : iter;
  const shadow = makeShadow('from-iter');
  let inloop = false;
  let got1 = false;
  let completed = false;
  let res;
  function loop() {
    inloop = true;
    while (got1 && !completed) {
      got1 = false;
      res = iterator.next();
      if (res.done) {
        sink(2);
        break;
      } else {
        shadow(1, res.value);
        sink(1, res.value);
      }
    }
    inloop = false;
  }
  function talkback(t) {
    if (completed) return;

    if (t === 1) {
      got1 = true;
      if (!inloop && !(res && res.done)) loop();
    } else if (t === 2) {
      completed = true;
    }
  }
  sink(0, talkback, shadow);
};

module.exports = fromIter;
