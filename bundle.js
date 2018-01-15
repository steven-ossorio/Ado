/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const $l = __webpack_require__(1);

$l(() => {
  function deleteItem(e) {
    e.target.parentNode.remove();
  }

  function addItem() {
    let liLength = document.querySelectorAll("#ul-list")[0].children.length + 1;

    let inputValue = $l("#todo-input").htmlElements[0].value;

    if (inputValue === "") {
      inputValue = "I will not allow this list to be empty";
    }

    function setRandomBGColor () {
      let letters = "123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 15)];
      }

      return color;
    }

    const color = setRandomBGColor();

    // const length = $l("li").htmlElements.length - 1;
    //
    // const listItem = $l("<li>");
    // listItem.append(inputValue);
    // listItem.attr("style", color);
    //
    // const button = $l("<button>");
    // button.attr("id", `button-${length}`);
    // button.append("x");
    //
    // listItem.append(button);
    // const buttons = listItem.children();
    // buttons.on('click', listItem.remove);

    $l("#ul-list").append(`<li class="${liLength}" style="background-color: ${color}">${inputValue}  <button class="delete-todo-button" type="submit" name="button">X</button></li>`);
    $l(".delete-todo-button").on("click", deleteItem);
    $l("#todo-input").htmlElements[0].value = "";
  }

  $l(".add-todo-button").on("click", addItem);
});


// document.addEventListener("DOMContentLoaded", () => {
//   // function addADoItem () {
//   //   let todoList = $("#todo-item").val();
//   //   console.log(todoList);
//   // }
//
  // document.querySelector(".add-todo-button").addEventListener("click", (e) => {
  //   let liLength = document.querySelectorAll("#ul-list")[0].children.length + 1;
  //   let todoList = $l("#todo-input").arr[0].value;
  //
  //   if (todoList === "") {
  //       todoList = "I will not allow this list to be empty";
  //   }
  //   function setRandomBGColor () {
  //     let letters = "123456789ABCDEF";
  //     let color = "#";
  //
  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 15)];
  //     }
  //
  //     return color;
  //   }
  //
  //   let color = setRandomBGColor();
  //
  //   $l("#ul-list").append(`<li class="${liLength}" style="background: ${color}">${todoList}  <button class="delete-todo-button" type="submit" name="button">X</button></li>`);
  //   $l("#todo-item").arr[0].value = "";
  // });
//
//   document.querySelector(".delete-todo-button").addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log(e.target.parentNode.classList.value);
//
//   });
// });


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(2);
const todo = __webpack_require__(0);
let funcArr = [];
let loaded = false;

const $l = selector => {
  // If selector is a string.
  if (typeof selector === "string") {
    if (selector[0] === '<') {
      const htmlElement = document.createElement(selector.slice(1, -1));
      return new DOMNodeCollection([htmlElement]);
    }
    // Returns all the dom elements
    return getNodes(selector);
    // Check if the selector is an element of HTML
  } else if (selector instanceof HTMLElement) {
    //  Creates a DOMNodeCollection instance
    return new DOMNodeCollection([selector]);
    // If it's a function
  } else if (selector instanceof Function) {
    // Calls function if DOMContent has loaded
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
    // If not push func into an array of functions to be run once loaded
    funcArr.push(func);
  }
}

function getNodes(selector) {
  // Grabbing all matching nodes
  let nodes = document.querySelectorAll(selector);
  // Convert the nodes into an array
  let arr = Array.from(nodes);
  // Pass in arr and create a new DOMNodeCollection instance
  return new DOMNodeCollection(arr);
}

document.addEventListener('DOMContentLoaded', () => {
  loaded = true;
  funcArr.forEach(func => func());
});

module.exports = $l;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(string) {
    if (string) {
      this.htmlElements.forEach(htmlElement => {
        htmlElement.innerHTML = string;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.htmlElements.forEach(htmlElement => {
      htmlElement.innerHTML = "";
    });
  }

  append(newElement) {
    const isHTMLElement = newElement instanceof HTMLElement;
    const isString = typeof newElement === "string";

    // Check if the instance is an initialized DOMNodeCollection
    if (newElement instanceof DOMNodeCollection) {
      // Iterate the array of this instance
      this.htmlElements.forEach(outerElement => {
        // Iterate the array within the passed object
        newElement.htmlElements.forEach(innerElement => {
            // Assign each outerElement as parent to each innerElement
          outerElement.innerHTML += innerElement.outerHTML;
        });
      });
      // Check if it's an instance of HTMLElement
    } else if (isHTMLElement || isString) {
      //  Iterate htmlElement
      this.htmlElements.forEach(outerElement => {
        //  Add newElement to the innerHTML of each htmlElement
        outerElement.innerHTML += newElement;
      });
    }
  }

  attr(attrName, value) {
    this.htmlElements.forEach(htmlElement => {
      htmlElement.getAttribute(attrName, value);
    });

    if (value === undefined) {
      this.htmlElements[0].getAttribute(attrName);
    } else {
      this.htmlElements.forEach(htmlElement => {
        htmlElement.setAttribute(attrName, value);
      });
    }
  }

  addClass(className) {
    this.htmlElements.forEach(htmlElement => {
      htmlElement.classList.add(className);
    });
  }

  removeClass(className) {
    this.htmlElements.forEach(htmlElement => {
      htmlElement.classList.remove(className);
    });
  }

  children() {
    let allChildren = [];
    this.htmlElements.forEach(htmlElement => {
      allChildren = allChildren.concat(htmlElement.children);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let allParents = [];
    this.htmlElements.forEach(htmlElement => {
      allParents = allParents.concat(htmlElement.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let allSelectors = [];
    //  Iterate each element within the array of DOM collection
    this.htmlElements.forEach(htmlElement => {
      /**
       * Queries html element for children matching the selector
       * Add successful queries to the aggregate.
       */
      allSelectors = allSelectors.concat(htmlElement.querySelectorAll(selector));
    });

    // Creates a new instance with the passed new array
    return new DOMNodeCollection(allSelectors);
  }

  remove() {
    // Iterate and remove itself from the parent node
    this.htmlElements.forEach( node => node.parentNode.removeChild(node));
  }

  on(type, listener) {
    // Iterate all elements in htmlElements
    this.htmlElements.forEach(htmlElement=> {
      // Set an event listener to each element
      htmlElement.addEventListener(type, listener);
      const key = `jqueryEvent-${type}`;
      const listeners = htmlElement[key] || [];
      // Push in the listener to the empty array
      htmlElement[key] = listeners.push(listener);
    });
  }

  off(type) {
    this.htmlElements.forEach(htmlElement=> {
      if (htmlElement[type]) {
        htmlElement[type].forEach(listener => {
          htmlElement.removeEventListener(type, listener);
        });
        htmlElement[type] = [];
      }
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);