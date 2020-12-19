import { parseCard } from '../action-parser';
import { RootAction, RootActionMove, RootFaction, RootFactionBoard, RootThing } from '../interfaces';
import { splitAction } from '../utils/action-splitter';
import { formRegex } from '../utils/regex-former';

const PURGE_DECREE_REGEX = formRegex('$_->');
const CHOOSE_LEADER_REGEX = formRegex('#<Leader|||chosenLeader>->$');
const ADD_TO_DECREE_REGEX = formRegex('[Number|||countAdded]<Card|||cardAdded>E->$_<Decree|||columnAdded>')


export function parseAddToDecree(actions: string[]): RootActionMove {

  const movingComponents = [];

  for (let action of actions) {
    const result = action.match(ADD_TO_DECREE_REGEX);
    const component = {
      number: +(result.groups.countAdded || 1),
      thing: parseCard(result.groups.cardAdded),
      start: RootFaction.Eyrie,
      destination: result.groups.columnAdded
    };

    movingComponents.push(component);
  }

  return {
    things: movingComponents
  };

}

export function parseEyrieAction(action: string): RootAction {

  if (CHOOSE_LEADER_REGEX.test(action)) {
    const result = action.match(CHOOSE_LEADER_REGEX);

    return {
      things: [{
        number: 1,
        thing: { cardName: result.groups.chosenLeader },
        start: null,
        destination: {faction: RootFaction.Eyrie} as RootFactionBoard
      }]
    };
  }

  if (PURGE_DECREE_REGEX.test(action)) {

    return {
      things: [{
        number: -1,
        thing: null,
        start: {faction: RootFaction.Eyrie} as RootFactionBoard,
        destination: 'Discard pile'
      } as RootThing]
    };

  }

  const simpleActions = splitAction(action);

  if (simpleActions.every(act => ADD_TO_DECREE_REGEX.test(act))) {
    return parseAddToDecree(simpleActions);
  }

  return null;

}
