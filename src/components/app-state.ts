import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { simpleMachine } from '../state/simpleMachine.js';


@customElement('app-state')
export class AppState extends LitElement {
  @property({
    reflect: false,
  }) stateMachine: any;

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
      ).start();
    }
  }

  render() {
    return html`
      <div>Context Data: ${JSON.stringify(this.stateMachine?.state?.context?.example)}</div>
    `;
  }
}
