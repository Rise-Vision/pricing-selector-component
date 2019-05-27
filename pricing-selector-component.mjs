import {PolymerElement, html} from "https://unpkg.com/@polymer/polymer@next/polymer-element.js?module"

class PricingSelectorComponent extends PolymerElement {
  static get properties() {
    return {
      showDisplayPrompt: {type: Boolean, value: false},
      displayPrompt: {type: String, value: "How many Displays do you want?"},
      displayCount: {type: Number, value: 2, reflectToAttribute: true, notify: true},
      showCountBox: {type: Boolean, value: false},
      showDiscountPrompt: {type: Boolean, value: false},
      discountPrompt: {type: String, value: "Are you a school or a non-profit?"},
      discountPromptYesText: {type: String, value: "Yes (get a 10% discount)"},
      discountPromptNoText: {type: String, value: "No"},
      showPeriodToggle: {type: Boolean, value: false},
      periodYearlyText: {type: String, value: "I want to pay yearly"},
      periodMonthlyText: {type: String, value: "I want to pay monthly"}
    };
  }

  updateDisplayCount() {
    const sliderCount = this.shadowRoot.getElementById("displayCountSlider").value;

    if (sliderCount === "100") {
      const boxCount = parseInt(this.shadowRoot.getElementById("displayCountBox").value) || 100;
      this.set("displayCount", Math.max(boxCount, 100));
      this.shadowRoot.getElementById("displayCountBox").value = this.displayCount;
    } else {
      this.set("displayCount", sliderCount);
    }
  }

  updateCountBox() {
    this.updateDisplayCount();
    this.updateCountBoxVisibility();
  }

  updateCountBoxVisibility() {
    this.set("showCountBox", parseInt(this.displayCount) >= 100);
  }

  static get template() {
    return html`
      <style>
        #main {
          width: 18em;
          text-align: center;
        }
        #promptText {
          font-weight: bold;
        }
        #displayCountBox {
          text-align: center;
          width: 4em;
          margin: 0.5em 0;
        }
        input[type=range] {
          -webkit-appearance: none;
          height: 12px;
          width: 100%;
          margin: 0;
          padding-top: 0.5em;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: black;
          margin-top: -5;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 10px;
          background: #e8e8e8;
          border-radius: 3px;
        }
      </style>
      <div id="main">
        <div id="displayPrompt" hidden=[[!showDisplayPrompt]]>
          <div id="promptText">[[displayPrompt]]</div>
          <div id="displayCountText" hidden=[[showCountBox]]>[[displayCount]]</div>
          <input type="text" id="displayCountBox" on-change="updateCountBox" hidden=[[!showCountBox]] value=[[displayCount]] />
          <input id="displayCountSlider" on-input="updateDisplayCount" on-change="updateCountBoxVisibility" type="range" value="{{displayCount}}">
        </div>
      </div>
    `;
  }
}

window.customElements.define("pricing-selector-component", PricingSelectorComponent);
