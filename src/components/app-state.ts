import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { simpleMachine } from '../state/simpleMachine.js';


@customElement('app-state')
export class AppState extends LitElement {
  @property({
    reflect: true,
  }) stateMachine: any;

  @property({
    reflect: false
  }) context: any;

  constructor() {
    super();
    this.updateStateMachine();
  }

  updateStateMachine() {
    if (!this.stateMachine) {
      this.stateMachine = interpret(
        simpleMachine,
        {
          devTools: true
        }
      );
    }
    this.stateMachine.onTransition((state: any) => {
      console.log('transition', state)
      this.context = JSON.stringify(state.context);
      console.log(this.context);
    }).start();
  }

  getThatState() {
    console.log(this.stateMachine);
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    console.log(name, _old, value);
    this.updateStateMachine();
  }

  render() {
    return html`
      <div>Context Data: ${this.context}</div>
      <button @click=${this.getThatState}>clog state</button>
    `;
  }
}
