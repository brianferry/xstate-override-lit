import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { inspect } from '@xstate/inspect';

inspect({
  iframe: false
})

import { simpleActions, simpleMachine } from '../state/simpleMachine.js';
import './app-state.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'Hey welcome to elePWAnty!';

  @query('#app')
  _appState: any;

  private _stateMachine: any;

  @property() enableBack: boolean = false;

  private _context: any;
  private _config: any;

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--accent-foreground-rest);
        color: white;
        height: 4rem;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1.5rem;
        font-weight: semibold;
      }

      #header-block {
        display: flex;
        align-items: center;
      }

      #logo-container {
        width: 8rem;
        height: 8rem;
        display: flex;
        align-items: center;
      }

      #logo {
        max-inline-size: 100%;
        block-size: auto;
      }

      @media (prefers-color-scheme: light) {
        header {
          color: black;
        }
      }
    `;
  }

  constructor() {
    super();
    this._config = {
      actions: {
        ...simpleActions,
        loadData: (context: any, data: any) => console.log(context, data),
      }
    };
    this._context = {
      example: 'newer data'
    }

  }

  async initApp() {
    await this.updateComplete;
    if (this._appState) {
      this._stateMachine = interpret(
        simpleMachine
          .withConfig(this._config)
          .withContext(this._context),
        {
          devTools: true
        }
      );
      this._appState.stateMachine = this._stateMachine;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.initApp();
  }

  async pressTheButton() {
    await this.updateComplete;

    this._stateMachine.send('PREVIEW', { "new": "data"} )
  }

  render() {
    return html`
      <header>
        <div id="header-block">
          <div id="logo-container">
            <img
              src="assets/icons/windows11/Wide310x150Logo.scale-400.png"
              alt="elePWAnty icon"
              width="310"
              height="150"
              id="logo"
              loading="eager"
            />
          </div>
          <h1>${this.title}</h1>
          
        </div>
<button @click=${this.pressTheButton}>Press The Button!</button>
          <app-state id="app"></app-state>
      </header>
    `;
  }
}
