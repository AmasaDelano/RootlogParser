import test from 'ava-ts';

import { parseAction } from '../src/action-parser';
import { RootFaction } from '../src/interfaces/rootgame';

test('Reveal action is parsed correctly when left side is combined and grouped', t => {

  const result = parseAction('(2R+F)#^P', 'C' as RootFaction);

  t.is(result.subjects[0].number, 2);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.subjects[0].revealer, 'C');

  t.is(result.subjects[1].number, 1);
  t.is(result.subjects[1].card.suit, 'F');
  t.is(result.subjects[1].revealer, 'C');

  t.is(result.targets[0], 'P');
});

test('Reveal action is parsed correctly when left side is combined and grouped', t => {

  const result = parseAction('2R#D+F#D^A', 'C' as RootFaction);

  t.is(result.subjects[0].number, 2);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.subjects[0].revealer, 'D');

  t.is(result.subjects[1].number, 1);
  t.is(result.subjects[1].card.suit, 'F');
  t.is(result.subjects[1].revealer, 'D');

  t.is(result.targets[0], 'A');
});

test('Reveal action is parsed correctly when right side is combined', t => {

  const result = parseAction('R#^A+C', 'D' as RootFaction);

  t.is(result.subjects[0].number, 1);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.subjects[0].revealer, 'D');

  t.is(result.targets[0], 'A');
  t.is(result.targets[1], 'C');
});

test('Reveal action is parsed correctly when full', t => {

  const result = parseAction('2R#D^O', 'C' as RootFaction);

  t.is(result.subjects[0].revealer, 'D');
  t.is(result.subjects[0].number, 2);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.targets[0], 'O');
});

test('Reveal specific card to whole table', t => {

  const result = parseAction('R#dom^', 'C' as RootFaction);

  t.is(result.subjects[0].number, 1);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.subjects[0].card.cardName, 'dominance');
  t.is(result.subjects[0].revealer, 'C');

  t.is(result.targets[0], null);
});

test('Reveal someone else\'s one card to whole table', t => {

  const result = parseAction('R#A^', 'C' as RootFaction);

  t.is(result.subjects[0].number, 1);
  t.is(result.subjects[0].card.suit, 'R');
  t.is(result.subjects[0].card.cardName, null);
  t.is(result.subjects[0].revealer, 'A');

  t.is(result.targets[0], null);
});

test('Reveal someone else\'s hand to whole table', t => {

  const result = parseAction('A^', 'C' as RootFaction);

  t.is(result.subjects[0].number, null);
  t.is(result.subjects[0].card, null);
  t.is(result.subjects[0].revealer, 'A');

  t.is(result.targets[0], null);
});

test('Reveal whole hand to one faction', t => {

  const result = parseAction('^A', 'C' as RootFaction);

  t.is(result.subjects[0].number, null);
  t.is(result.subjects[0].card, null);
  t.is(result.subjects[0].revealer, 'C');

  t.is(result.targets[0], 'A');
});

test('Reveal action uses correct default values when empty', t => {

  const result = parseAction('^', 'A' as RootFaction);

  t.is(result.subjects[0].number, null);
  t.is(result.subjects[0].card, null);
  t.is(result.subjects[0].revealer, 'A');

  t.is(result.targets[0], null);
});