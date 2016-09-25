(function () {
  'use strict';

  class Button {
    constructor(options) {
      this.text = options.text || '';
      this.attrs = options.attrs || [];
      this.classAttrs = options.classAttrs || [];
      this.el = options.el;
      this.render();
    }

    setAttrs (attrs) {
      Object.keys(attrs).forEach( name => {
        this.el.setAttribute(name, attrs[name]);
      })
    }

    setClassAttrs (classAttrs) {
      this.classAttrs.forEach( name => {
        this.el.classList.add(name);
      })
    }

    render () {
      this.el.innerHTML = this.text;
      this.setAttrs(this.attrs);
      this.setClassAttrs(this.classAttrs);
      return this;
    }

    toString () {
      return this.el.outerHTML;
    }
  }

  //export
  window.Button = Button;
})();
