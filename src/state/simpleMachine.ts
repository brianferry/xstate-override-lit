import { assign, createMachine } from 'xstate';

export const simpleContext = {
  data: {}
};

export const simpleActions = {
  loadData: (context: any, _ev: any) => {
    context.data = { example: 'data' }
  },
  loadDataTwo: (context: any, _ev: any) => {
    context.data = { example: 'dataaaaaaaa' }
  },
  loadPreviewData: assign({
    context: (_ctx: any, evt) => evt,
  })
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
          '': 'idle',
        },
      },
      idle: {
        on: {
          ANOTHER: 'anotherOne',
          PREVIEW: {
            actions: ['loadPreviewData'],
          }
        }
      },
      anotherOne: {
        entry: ['loadDataTwo'],
        on: {
          FINISH: 'finished',
          PREVIEW: {
            actions: ['loadPreviewData'],
          }
        }
      },
      finished: {
        type: 'final',
      }
    }
  },
  {
    actions: simpleActions
  }
);


