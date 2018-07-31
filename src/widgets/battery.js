const feather = require('feather-icons');
const set = require('lodash.set');
const Widget = require('../lib/widget.js');
const { activate } = require('../lib/helpers.js');

const name = 'battery';
const icon = feather.icons.battery.toSvg();
const description = 'Display your computer\'s battery level.';

const state = {
  test: true,
  default: true,
  display: true,
  position: {
    x: '',
    y: '',
  },
  size: {
    width: '',
    height: '',
  },
  fill: {
    color: '',
    opacity: '',
  },
  font: {
    typeface: 'San Francisco',
    align: 'center',
    size: '',
    color: '',
  },
  border: {
    size: '',
    color: '',
  },
  corners: 'round',
  resizable: false,
  alwaysOnTop: true,
  focusable: false,
  shadow: false,
  displayAll: true,
};

function c() {
  console.log('c');
  state.display = !state.display;
}

const options = () => `
<div>
  <div class="section">
    <div class="label">${name}</div>
    <div class="content">
      <div class="checkbox">
        <input id="${name}-c" class="display-checkbox" type="checkbox" data-key="display" ${state.display ? 'checked' : ''} onChange="${c}">
        <label for="${name}-c">
          <span>Display</span>
        </label>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="hr"></div>
  </div>

  <div class="options ${state.display ? '' : 'disabled'}">

    <div class="section">
      <div class="label">Position</div>
      <div class="content">
        <div class="input-text" title="Position on X axis">
          <input type="text" maxlength="4" data-key="position.x" value="${state.position.x}">
          <span>X</span>
        </div>
        <div class="input-text" title="Position on Y axis">
          <input type="text" maxlength="4" data-key="position.y" value="${state.position.y}">
          <span>Y</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="label">Size</div>
      <div class="content">
        <div class="input-text" title="Widget Width">
          <input type="text" maxlength="4" data-key="size.width" value="${state.size.width}">
          <span>W</span>
        </div>
        <div class="input-text" title="Widget Height">
          <input type="text" maxlength="4" data-key="size.height" value="${state.size.height}">
          <span>H</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="label">Fill</div>
      <div class="content">
        <div class="input-text" title="Background Color">
          <input type="text" maxlength="6" data-key="fill.color" value="${state.fill.color}">
          <span>#</span>
        </div>
        <div class="input-text" title="Background Opacity">
          <input type="text" maxlength="6" data-key="fill.opacity" value="${state.fill.opacity}">
          <span>%</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="hr"></div>
    </div>

    <div class="section">
      <div class="label">Typeface</div>
      <div class="content">
        <div class="dropdown" title="Font Name">
          <select>
            <option value="one">San Francisco</option>
            <option value="two">Hack</option>
            <option value="three">Arial</option>
            <option value="three">Arial</option>
            <option value="three">Arial</option>
            <option value="three">Arial</option>
          </select>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="label">Align</div>
      <div class="content">
        <div class="segmented-control">
          <div class="${state.font.align === 'left' ? 'selected' : ''}" title="Align Text Left" data-name="left">
            ${feather.icons['align-left'].toSvg()}
          </div>
          <div class="${state.font.align === 'center' ? 'selected' : ''}" title="Align Text Center" data-name="center">
            ${feather.icons['align-center'].toSvg()}
          </div>
          <div class="${state.font.align === 'right' ? 'selected' : ''}" title="Align Text Right" data-name="right">
            ${feather.icons['align-right'].toSvg()}
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="label">Font</div>
      <div class="content">
        <div class="input-text" title="Font Size">
          <input type="text" maxlength="4" data-key="font.size" value="${state.font.size}">
          <span>PX</span>
        </div>
        <div class="input-text" title="Font Color">
          <input type="text" maxlength="6" data-key="font.color" value="${state.font.color}">
          <span>#</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="hr"></div>
    </div>

    <div class="section">
      <div class="label">Border</div>
      <div class="content">
        <div class="input-text" title="Border Size">
          <input type="text" maxlength="4" data-key="border.size" value="${state.border.size}">
          <span>PX</span>
        </div>
        <div class="input-text" title="Border Color">
          <input type="text" maxlength="6" data-key="border.color" value="${state.border.color}">
          <span>#</span>
        </div>
      </div>
    </div>

  </div>
</div>
  `;

const settings = () => '<span>settings</span>';

const start = () => {
  const controls = document.querySelectorAll('.segmented-control > div');
  controls.forEach((button) => {
    button.onclick = () => {
      activate(button, 'selected');
      state.font.align = button.getAttribute('data-name');
    };
  });

  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.getAttribute('type') === 'checkbox') {
      input.onchange = () => { set(state, input.getAttribute('data-key'), input.checked); };
    } else {
      input.onblur = () => { set(state, input.getAttribute('data-key'), input.value); };
    }
  });
};

const Battery = new Widget(
  name,
  icon,
  description,
  options,
  settings,
  state,
  start,
);

module.exports = Battery;
