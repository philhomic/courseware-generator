import shortid from 'shortid';

function guid () {
  return shortid.generate();
}

function clone (json) {
  return JSON.parse(JSON.stringify(json));
}

function isObject (o) {
  let type = typeof o;
  return type === 'function' || type === 'object' && !!o;
}

function updateJSON (json, key, f) {
  let args = [].slice.call(arguments);
  for (let k in json) {
    if (json.hasOwnProperty(k) && k === key) {
      if (isObject(json[k])) {
        updateJSON(json[k], key, f);
      } else {
        json[k] = f.apply(null, args.slice(2));
      }
    } else if (json.hasOwnProperty(k) && isObject(json[k])) {
      updateJSON(json[k], key, f);
    }
  }
}

export {
  guid,
  clone,
  updateJSON
};
