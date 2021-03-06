import {PolymerElement, html} from "https://unpkg.com/@polymer/polymer@3.2.0/polymer-element.js?module"

class PricingSelectorComponent extends PolymerElement {
  static get properties() {
    return {
      showDisplayCountSection: {type: Boolean, value: false},
      displayCountText: {type: String, value: "How many Displays do you want?"},
      displayCount: {type: Number, value: 5, reflectToAttribute: true, notify: true},
      showCountBox: {type: Boolean, value: false},
      showDiscountSection: {type: Boolean, value: false},
      applyDiscount: {type: Boolean, value: false, reflectToAttribute: true, notify: true},
      discountPrompt: {type: String, value: "Are you a school or a non-profit?"},
      discountPromptYesText: {type: String, value: "(get a 10% discount)"},
      discountPromptNoText: {type: String, value: ""},
      showPeriodSection: {type: Boolean, value: false},
      periodYearlyText: {type: String, value: "I want to pay yearly, by credit card or invoice"},
      periodMonthlyText: {type: String, value: "I want to pay monthly, by credit card"},
      period: {type: String, value: "yearly", reflectToAttribute: true, notify: true},
      periodYearly: {type: Boolean, computed: "isYearly(period)"},
      periodMonthly: {type: Boolean, computed: "isMonthly(period)"},
      pricingData: {type: Object, value: {}},
    };
  }

  internalPath() {
    return "https://widgets.risevision.com/stable/components/pricing/";
  }

  updateSlider() {
    const sliderCount = this.shadowRoot.getElementById("displayCountSlider").value;

    this.set("displayCount", sliderCount);

    if (this.displayCount >= 100) {
      this.set("showCountBox", true);
    }
  }

  updateBox() {
    const boxCount = parseInt(this.shadowRoot.getElementById("displayCountBox").value) || 0;

    this.set("displayCount", boxCount);
  }

  discountYes() {
    this.applyDiscount = true;
  }

  discountNo() {
    this.applyDiscount = false;
  }

  setYearly() {
    this.period = "yearly";
  }

  setMonthly() {
    this.period = "monthly";
  }

  isYearly(period) {return period === "yearly"}
  isMonthly(period) {return period === "monthly"}

  static get template() {
    return html`
      <style>
        #main {
          width: 100%;
          text-align: center;
        }
        .toggleContainer {
          display: flex;
          align-items: stretch;
          border: solid 1px rgb(16, 125, 218);
          border-radius: 4px;
          width: 100%;
        }
        .displayCount {
          font-size: 48px;
          font-weight: bold;
        }
        #periodYearly span {
          background-color: #fcf5bf;
          font-style: italic;
          font-weight: bold;
          color: #3dbd51;
        }
        .discountOption {
          width: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5em;
          box-sizing: border-box;
        }
        .discountOption[selected] {
          background-color: rgb(16, 125, 218);
          color: white;
        }
        .promptText {
          font-weight: bold;
          margin-bottom: 0.5em;
          font-size:1.3em;
        }
        @media (max-width: 767px) {
          #periodContainer {
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
          }
          .discountOption {
            width: 100%;
            padding
          }
          .displayCount {
            font-size: 24px;
          }
          .promptText {
            font-size: 1em;
          }
        }
        #displayCountSlider {
          outline: none
        }
        #displayCountBox {
          text-align: center;
          width: 3em;
        }
        [type='range'] {
          margin: 0;
          outline: none;
          padding: 0;
          width: 100%;
          height: 30px;
          background: transparent;
          font: 1em/1 arial, sans-serif;
        }
        [type='range'], [type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
        }
        [type='range']::-webkit-slider-runnable-track {
          box-sizing: border-box;
          border: solid 2px rgb(151, 151, 151);
          border-radius: 0.5em;
          width: 100%;
          height: 0.75em;
          background: transparent;
        }
        [type='range']::-moz-range-track {
          box-sizing: border-box;
          border: solid 2px rgb(151, 151, 151);
          width: 100%;
          height: 0.75em;
          border-radius: 0.5em;
          background: transparent;
        }
        [type='range']::-ms-track {
          box-sizing: border-box;
          border: solid 2px rgb(151, 151, 151);
          width: 100%;
          height: 0.75em;
          border-radius: 0.5em;
          background: transparent;
        }
        [type='range']::-moz-range-progress {
          height: 0.25em;
          background: transparent;
        }
        [type='range']::-ms-fill-lower {
          height: 0.25em;
          background: transparent;
        }
        [type='range']::-webkit-slider-thumb {
          margin-top: -10px;
          box-sizing: border-box;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgb(16, 125, 218);
        }
        [type='range']::-moz-range-thumb {
          box-sizing: border-box;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgb(16, 125, 218);
        }
        [type='range']::-ms-thumb {
          margin-top: 0;
          box-sizing: border-box;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgb(16, 125, 218);
        }
        [type='range']::-ms-tooltip {
          display: none;
        }
      </style>
      <div id="main">

        <section id="displayCountSection" hidden=[[!showDisplayCountSection]]>
          <div class="promptText">[[displayCountText]]</div>
          <div id="displayCountText" class="displayCount" hidden=[[showCountBox]]>[[displayCount]]</div>
          <input type="number" class="displayCount" min="1" id="displayCountBox" on-input="updateBox" hidden=[[!showCountBox]] value=[[displayCount]] />
          <input id="displayCountSlider" min="1" max="100" on-input="updateSlider" type="range" value="{{displayCount}}">
        </section>

        <section id="discountSection" hidden=[[!showDiscountSection]]>
          <div class="promptText">[[discountPrompt]]</div>
          <div id=discountContainer class="toggleContainer">
            <div id="discountYes" on-click="discountYes" class="discountOption" selected$=[[applyDiscount]]>
              Yes [[discountPromptYesText]]
              <div hidden$=[[!applyDiscount]]>
                <img src$="[[internalPath()]]check-mark.svg" />
              </div>
            </div>
            <div id="discountNo" on-click="discountNo" class="discountOption" selected$=[[!applyDiscount]]>
              No [[discountPromptNoText]]
              <div hidden$=[[applyDiscount]]>
                <img src$="[[internalPath()]]check-mark.svg" />
              </div>
            </div>
          </div>
        </section>

        <section id="periodSection" hidden=[[!showPeriodSection]]>
          <div id=periodContainer class="toggleContainer">
            <div id="periodYearly" on-click="setYearly" class="discountOption" selected$=[[periodYearly]]>
              [[periodYearlyText]]
              <div hidden$=[[!periodYearly]]>
                <img src$="[[internalPath()]]check-mark.svg" />
              </div>
            </div>
            <div id="periodMonthly" on-click="setMonthly" class="discountOption" selected$=[[periodMonthly]]>
              [[periodMonthlyText]]
              <div hidden$=[[periodYearly]]>
                <img src$="[[internalPath()]]check-mark.svg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}

window.customElements.define("pricing-selector-component", PricingSelectorComponent);
