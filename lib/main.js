const DOMNodeCollection = require('./dom_node_collection.js');
const todo = require('../todo.js');
let funcArr = [];
let loaded = false;

window.$l = selector => {
  // If selector is a string.
  if (typeof selector === "string") {
    // Returns all the dom elements.
    return getNodes(selector);
    // Check if the selector is an element of HTML.
  } else if (selector instanceof HTMLElement) {
    //  Creates a DOMNodeCollection instance.
    return new DOMNodeCollection([selector]);
  } else if (selector instanceof Function) {
    return readyCallback(selector);
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

function readyCallback(func) {
  // Check if document has loaded
  if (loaded) {
    // Run function
    func();
  } else {
    // If not push func into an array of functions to be run once loaded.
    funcArr.push(func);
  }
}

function getNodes(selector) {
  // Grabbing all matching nodes.
  let nodes = document.querySelectorAll(selector);
  // Convert the nodes into an array.
  let arr = Array.from(nodes);
  // Pass in arr and create a new DOMNodeCollection instance.
  return new DOMNodeCollection(arr);
}

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  funcArr.forEach(func => func());
});
