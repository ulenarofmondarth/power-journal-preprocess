import { MODULE_ID } from '@lib/constants';
const LOCALSTORE: Record<string, string> = {};

function lookup(name: string): string | undefined {
  const vars: Record<string, string> =
    typeof game === 'undefined' ? LOCALSTORE : (game.settings?.get(MODULE_ID, 'variables') as Record<string, string>);

  return vars[name];
}

function save(name: string, value: string): string {
  const vars: Record<string, string> =
    typeof game === 'undefined' ? LOCALSTORE : (game.settings?.get(MODULE_ID, 'variables') as Record<string, string>);

  vars[name] = value;

  if (typeof game !== 'undefined') {
    game.settings?.set(MODULE_ID, 'variables', vars);
  }

  return '';
}

export { save, lookup };
