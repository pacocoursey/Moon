const { template, activate } = require('./helpers.js');
const registerListeners = require('./input.js');

const aside = document.querySelector('aside');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

let active = '';

class Widget {
  constructor(name, icon, description, options, settings, state, start) {
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.options = options;
    this.settings = settings;
    this.state = state;
    this.start = start;

    this.init();
  }

  init() {
    const html = `
    <div class="widget${this.state.display ? '' : ' gray'}">
      <div class="icon">${this.icon}</div>
      <div class="title">${this.name}</div>
    </div>
    `;

    const div = template(html);
    aside.appendChild(div);

    div.onclick = () => {
      if (active !== this.name) {
        // Activate the clicked widget
        activate(div.children[1], 'active');
        active = this.name;

        // Load the new widget
        main.innerHTML = ''; footer.innerHTML = '';
        main.appendChild(template(this.settings()));
        footer.appendChild(template(this.options()));

        // Register general listeners
        registerListeners();

        // Start widget specific code
        this.start();
      }
    };

    // Trigger click event on default widget
    if (this.state.default === true) div.click();
  }
}

module.exports = Widget;
