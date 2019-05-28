import {PolymerElement, html} from "https://unpkg.com/@polymer/polymer@next/polymer-element.js?module"

class PricingSelectorComponent extends PolymerElement {
  static get properties() {
    return {
      showDisplayCountSection: {type: Boolean, value: false},
      displayCountText: {type: String, value: "How many Displays do you want?"},
      displayCount: {type: Number, value: 2, reflectToAttribute: true, notify: true},
      showCountBox: {type: Boolean, value: false},
      showDiscountSection: {type: Boolean, value: false},
      applyDiscount: {type: Boolean, value: false, reflectToAttribute: true, notify: true},
      discountPrompt: {type: String, value: "Are you a school or a non-profit?"},
      discountPromptYesText: {type: String, value: "(get a 10% discount)"},
      discountPromptNoText: {type: String, value: ""},
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

  discountYes() {
    this.applyDiscount = true;
  }

  discountNo() {
    this.applyDiscount = false;
  }

  static get template() {
    return html`
      <style>
        #main {
          width: 25em;
          text-align: center;
        }
        section {
          margin-bottom: 2em;
        }
        #discountContainer {
          display: flex;
          align-items: center;
          border: solid 1px #292b2c;
          border-radius: 4px;
          width: 100%
        }
        .discountOption {
          width: 50%;
          cursor: pointer;
        }
        .discountOption span {
          font-size: small;
        }
        .discountOption[selected] {
          background-color: #e8e8e8;
        }
        .discountOption[selected]::after {
          content: "\\002714";
          margin: 0.5em;
        }
        .promptText {
          font-weight: bold;
          margin-bottom: 0.5em;
        }
        #displayCountSlider {
          outline: none
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
        <section id="displayCountSection" hidden=[[!showDisplayCountSection]]>
          <div class="promptText">[[displayCountText]]</div>
          <div id="displayCountText" hidden=[[showCountBox]]>[[displayCount]]</div>
          <input type="text" id="displayCountBox" on-change="updateCountBox" hidden=[[!showCountBox]] value=[[displayCount]] />
          <input id="displayCountSlider" on-input="updateDisplayCount" on-change="updateCountBoxVisibility" type="range" value="{{displayCount}}">
        </section>

        <section id="discountSection" hidden=[[!showDiscountSection]]>
          <div class="promptText">[[discountPrompt]]</div>
          <div id=discountContainer>
            <div id="discountYes" on-click="discountYes" class="discountOption" selected$=[[applyDiscount]]>Yes <span>[[discountPromptYesText]]</span></div>
            <div id="discountNo" on-click="discountNo" class="discountOption" selected$=[[!applyDiscount]]>No [[discountPromptNoText]]</div>
          </div>
        </section>
      </div>
    `;
  }
}

window.customElements.define("pricing-selector-component", PricingSelectorComponent);
