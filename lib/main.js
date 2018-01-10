const DOMNodeCollection = require('./dom_node_collection');

let funcArr = [];
let loaded = false;

window.$l = (arg) => {
  switch (typeof arg) {
    case "function":
      return functionType(arg);
    case "string":
      return stringType(arg);
    case "object":
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
  }
};

$l.extend = (firstObj, ...objs) => {
  objs.forEach( obj => {
    obj.forEach( el => {
      firstObj[el] = obj[el];
    });
  });

  return firstObj;
};

$l.ajax = (obj) => {
  const xhr = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };

  obj = $l.extend(defaults, obj);
  obj.method = obj.method.toUpperCase();

  xhr.open(obj.method, obj.url);
  xhr.onload = e => {
    if (xhr.status === 200) {
      obj.success(xhr.response);
    } else {
      obj.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(obj.data));
};

function functionType(arg) {
  if (loaded) {
    return func();
  } else {
    return funcArr.push(arg);
  }
}

function stringType(arg) {
  let nodes = document.querySelectorAll(arg);
  let arr = Array.from(nodes);
  return new DOMNodeCollection(arr);
}

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  funcArr.forEach(func => func());
});
