// <div class="ui error message">
//     <div class="header">Action Forbidden</div>
//     <p>You can only sign up for an account once with a given e-mail address.</p>
//   </div>

class Message {
  constructor(options) {
    this.header = options.header;
    this.text = options.text;
    this.classAttrs = options.classAttrs || [];
    this.el = options.el;
  }

  setClassAttrs (classAttrs) {
    classAttrs.forEach( name => {
      this.el.classList.add(name);
    })
  }

  _render() {
    this.el.innerHTML = this.text;
    this.setClassAttrs(this.classAttrs);
    return this;
  }
}
//export
window.Message = Message;
