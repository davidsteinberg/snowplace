class StateMachine {
  constructor(params) {
    const { states, start, silent = true } = params;

    const statesByName = {};
    for (const state of states) {
      statesByName[state.name] = state;
    }

    this.states = statesByName;
    this.startState = start || states[0];
    this.currentState = null;
    this.silent = silent;
  }

  log(...args) {
    if (!this.silent) {
      console.log(...args);
    }
  }

  start() {
    this.setStateNamed(this.startState.name);
  }

  transition(params) {
    const { type, data } = params;

    this.log(`Transitioning with event: ${type}`);

    const { currentState } = this;
    const { transitions } = currentState;
    const transition = transitions[type];

    if (transition === undefined) {
      throw new Error(
        `Unhandled event: ${type}, in state: ${
          currentState.name
        }. Valid events are: ${Object.keys(transitions).join(", ")}.`
      );
    }

    transition.bind(currentState)({ data, machine: this });
  }

  setStateNamed(name) {
    const { states } = this;
    const state = states[name];

    if (state === undefined) {
      throw new Error(
        `Unknown state: ${name}. Valid states are: ${Object.keys(states).join(
          ", "
        )}.`
      );
    }

    const { currentState } = this;
    if (currentState) {
      this.log(`Exiting state: ${currentState.name}`);
      (currentState.exit || (() => {}))({ machine: this });
    }

    this.currentState = state;

    this.log(`Entering state: ${name}`);

    const { enter } = state;
    if (enter) {
      enter.bind(state)({ machine: this });
    }
  }
}

export default StateMachine;
