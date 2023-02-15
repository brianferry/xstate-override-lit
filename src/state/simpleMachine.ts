import { createMachine } from 'xstate';
import { inspect } from '@xstate/inspect';

inspect({
  iframe: false
})

export const simpleContext = {
  data: {}
};

export const simpleActions = {
  loadData: (context: any, _ev: any) => {
    context.data = { example: 'data' }
  }
}


export const simpleMachine = createMachine(
  {
    id: 'simpleMachine',
    initial: 'init',
    context: simpleContext,
    states: {
      init: {
        on: {
          '': 'loading'
        }
      },
      loading: {
        entry: ['loadData'],
        on: {
          '': 'idle'
        }
      },
      idle: {
        on: {
          FINISH: 'finished'
        }
      },
      finished: {
        type: 'final'
      }
    }
  },
  {
    actions: simpleActions
  }
);


