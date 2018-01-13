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
        // Iterate the array within the passed object.
        newElement.htmlElement.forEach(innerElement => {
            // Assign each outerElement as parent to each innerElement.
          outerElement.innerHTML += innerElement.outerHTML;
        });
      });
      // Check if it's an instance of HTMLElement
    } else if (isHTMLElement || isString) {
      //  Iterate htmlElement.
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
    //  Iterate each element within the array of DOM collection.
    this.htmlElements.forEach(htmlElement => {
      /**
       * Queries html element for children matching the selector.
       * Add successful queries to the aggregate.
       */
      allSelectors = allSelectors.concat(htmlElement.querySelectorAll(selector));
    });

    // Creates a new instance with the passed new array.
    return new DOMNodeCollection(allSelectors);
  }

  remove() {
    // Iterate and remove itself from the parent node.
    this.htmlElements.forEach( node => node.parentNode.removeChild(node));
  }

  on(type, listener) {
    // Iterate all elements in htmlElements
    this.htmlElements.forEach(htmlElement=> {
      // Set an event listener to each element.
      htmlElement.addEventListener(type, listener);
      // Check if key is defined
      if (htmlElement[type] === "undefined") {
        // If not defined then set a key to empty array
        htmlElement[type] = [];
      }
      // Push in the listener to the empty array.
      htmlElement[type].push(listener);
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
