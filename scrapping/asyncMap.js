const common = require("@metarhia/common");

const map = (items, fn, done) => {
  done = done || common.emptyness;
  const len = items.length;
  if (!len) {
    done(null, []);
    return;
  }
  let errored = false;
  let count = 0;
  const result = new Array(len);

  const next = (index, err, value) => {
    if (errored) return;
    if (err) {
      errored = true;
      done(err);
      return;
    }
    result[index] = value;
    count++;
    if (count === len) done(null, result);
  };

  for (let i = 0; i < len; i++) {
    fn(items[i], next.bind(null, i));
  }
};

module.exports = {map : map};