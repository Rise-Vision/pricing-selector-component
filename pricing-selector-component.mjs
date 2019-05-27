import {PolymerElement, html} from "https://unpkg.com/@polymer/polymer@next/polymer-element.js?module"

class PricingSelectorComponent extends PolymerElement {
  static get properties() {
    return {
      showDisplayPrompt: {
        type: Boolean,
        value: false,
      },
      displayPrompt: {
        type: String,
        value: "How many Displays do you want?",
      },
      displayCount: {
        type: Number,
        value: 2,
        reflectToAttribute: true,
        notify: true
      },
      showDiscountPrompt: {
        type: Boolean,
        value: false,
      },
      discountPrompt: {
        type: String,
        value: "Are you a school or a non-profit?",
      },
      discountPromptYesText: {
        type: String,
        value: "Yes (get a 10% discount)",
      },
      discountPromptNoText: {
        type: String,
        value: "No",
      },
      showPeriodToggle: {
        type: Boolean,
        value: false,
      },
      periodYearlyText: {
        type: String,
        value: "I want to pay yearly",
      },
      periodMonthlyText: {
        type: String,
        value: "I want to pay monthly",
      }
    };
  }

  updateDisplayCount() {
    this.set("displayCount", this.shadowRoot.getElementById("displaySlider").value);
  }

  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
        input[type=range] {
          -webkit-appearance: none;
          height: 12px;
          width: 100%;
          margin: 0;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: 1px solid #000000;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: black;
          cursor: pointer;
          margin-top: -5;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 10px;
          cursor: pointer;
          background: #e8e8e8;
          border-radius: 3px;
          border: 0px solid #010101;
        }
      </style>
      <div id="displayPrompt" hidden=[[!showDisplayPrompt]]>
        <div>[[displayPrompt]]</div>
        <div id="displayCount">[[displayCount]]</div>
        <input id="displaySlider" on-input="updateDisplayCount" type="range" min="1" max="99" value="{{displayCount}}">
      </div>
    `;
  }
}

window.customElements.define("pricing-selector-component", PricingSelectorComponent);
