(function () {
  'use strict';

  //import
  let Button = window.Button;

  class ModalForm {

    constructor(options = { data: {} }) {
      this.data = options.data;
      this.ico = options.ico;
      this.classAttrs = options.classAttrs || [];
      this.el = options.el;
      this.render();
    }

    render () {
      this.setClassAttrs(this.classAttrs);
      this._updateHtml();
      // this._installControls();
      return this;
    }

    setClassAttrs (classAttrs) {
      this.classAttrs.forEach( name => {
        this.el.classList.add(name);
      })
    }

    _getFields () {
      let fields = this.data.fields;
      return fields.map(field => {
        return `
        <div class="field ${field.required}">
          <label>${field.label}</label>
          <input type="${field.type}" name="${field.name}" placeholder="${field.label}">
        </div>
        `
      }).join(' ');
    }

    _updateHtml () {
      this.el.innerHTML = `
        <div class="close_icon close_icon_${this.ico}">
          <i class="close icon float_right"></i>
        </div>
        <h2 class="ui center aligned icon header">
          <i class="circular users icon"></i>
          ${this.data.title}
        </h2>
        <div class="description">
          <div class="form_container">
            <form class="ui form">
              ${this._getFields()}
            </form>
          </div>
        </div>
      `;
    }

  }

  //export
  window.ModalForm = ModalForm;
})();
