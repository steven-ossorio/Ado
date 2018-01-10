class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(string) {
    if (string) {
      this.arr.forEach( el => {
        el.innerHTML = string;
      });
    } else {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.arr.forEach( el => {
      el.innerHTML = "";
    });
  }

  append(newElement) {
    this.arr.forEach( innerElement => {
      innerElement.innerHTML += newElement;
    });
  }

  attr(attrName, value) {
    this.arr.forEach( el => {
      el.setAttribute(attrName, value);
    });
  }

  addClass(className) {
    this.arr.forEach( el => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.arr.forEach( el => {
      el.classList.remove(className);
    });
  }

  children() {
    let allChildren = [];
    this.arr.forEach( el => {
      allChildren = allChildren.concat(el.children);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    let allParents = [];
    this.arr.forEach( el => {
      allParents = allParents.concat(el.parentNode);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let allSelectors = [];
    this.arr.forEach( el => {
      allSelectors = allSelectors.concat(el.querySelectorAll(selector));
    });

    return new DOMNodeCollection(allSelectors);
  }

  remove(selector) {
    if (!selector) {
      this.arr.forEach( el => {
        el.parentNode.removeChild(el);
      });
    } else {
      this.find(selector).remove();
    }
  }

  on(type, listener) {
    this.arr.forEach( el => {
      el.addEventListener(type, listener);
      el.func = listener;
    });
  }

  off(type) {
    this.arr.forEach( el => {
      el.removeEventListener(type, el.func);
    });
  }

}

module.exports = DOMNodeCollection;
