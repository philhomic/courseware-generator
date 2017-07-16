import shortid from 'shortid';

const unescapeHTMLMap = {
  '&': /&amp;/gi,
  '<': /&lt;/gi,
  '>': /&gt;/gi,
  '"': /&quot;/gi,
  '\'': /&apos;/gi,
  '/': /&#x2f;/gi
};
const letterMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;',
  '/': '&#x2F;'
};

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

function unescapeHTML (str) {
  if (str === '' || str === null) {
    return '';
  }
  // str = str.replace(/&#(x)?([\w\d]{0,5});/ig, function (full, hex, code) {
  //   return String.fromCharCode(parseInt(code, hex ? 16 : 10));
  // });

  for (var src in unescapeHTMLMap) {
    str = str.replace(unescapeHTMLMap[src], src);
  }

  return str;
}

function idxToLetter (idx) {
  return letterMap[idx];
}

function escapeHTML (string) {
  let htmlEscaper = /[&<>"'/]/g;
  return ('' + string).replace(htmlEscaper, function (match) {
    return htmlEscapes[match];
  });
}

export {
  guid,
  clone,
  updateJSON,
  unescapeHTML,
  idxToLetter,
  escapeHTML
};
