import shortid from 'shortid';
import Vue from 'vue';
const sanitizeHTML = require('sanitize-html');

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

function hasContent (htmlString) {
  let elem = document.createElement('div');
  elem.innerHTML = unescapeHTML(htmlString);
  return elem.textContent !== '' || elem.getElementsByTagName('img').length !== 0;
}

function filterHTMLMarkup (string) {
  let reg = /&amp;|&lt;|&gt;|&quot|&apos|&#x2F/g;
  return string.replace(reg, '');
}

function refreshQuestionNumber (page) {
  let idx = 0;
  page.blocks.forEach(function (block) {
    if (block.isQuestion) {
      idx += 1;
      Vue.set(block, 'questionNumber', idx);
    }
  });
}

function storeToLocal (itemName, data) {
  window.localStorage.setItem(itemName, JSON.stringify(data));
}

function sanitize (htmlstring, hasStyle) {
  let allowedAttributes;
  if (hasStyle) {
    allowedAttributes = ['style', 'src', 'href', 'align', 'alt', 'center', 'bgcolor'];
  } else {
    allowedAttributes = [];
  }
  let cleanHTML = sanitizeHTML(htmlstring, {
    allowedTags: sanitizeHTML.defaults.allowedTags.concat(['img', 'section', 'sup', 'sub', 'u']),
    allowedAttributes: {
      '*': allowedAttributes
    }
  });
  // console.log(cleanHTML);
  return cleanHTML;
}

// 凡是在编辑器中使用到了innerHTML的地方，都使用了该方法来过滤危险代码
// 如果给可信任的人使用，可以将该函数中的sanitize去掉，使编辑器获得更大的灵活性
function cleanHTML (htmlstring) {
  return sanitize(unescapeHTML(htmlstring), true);
}

function isNumber (n) {
  return toString.call(n) === '[object ' + Number + ']';
}

export {
  guid,
  clone,
  updateJSON,
  unescapeHTML,
  idxToLetter,
  escapeHTML,
  hasContent,
  filterHTMLMarkup,
  refreshQuestionNumber,
  storeToLocal,
  sanitize,
  cleanHTML,
  isNumber
};
