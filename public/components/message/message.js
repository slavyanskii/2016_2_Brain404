class Message {
  constructor(options) {
    this.header = options.header;
    this.text = options.text || '';
    this.classAttrs = options.classAttrs || [];
    this.el = options.el;
    this._render();
  }

  setClassAttrs(classAttrs) {
    classAttrs.forEach((name) => {
      this.el.classList.add(name);
    });
  }

  _render() {
    this.el.innerHTML = this.text;
    this.setClassAttrs(this.classAttrs);
    return this;
  }
}

window.Message = Message;
