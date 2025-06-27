import { MODULE_ID } from '@lib/constants';
import { expand } from '@lib/expand';
import { addMacroTable } from '@lib/standardMacroLookup';
import FVTT_MacroTable from '@lib/fvtt/macroTable';
import * as API from '@lib/api';

export function powerEnhance() {
  if (!game.modules?.get('lib-wrapper')?.active && game.user?.isGM)
    ui.notifications?.error("Module power-journal requires the 'libWrapper' module. Please install and activate it.");

  game.settings?.register(MODULE_ID, 'variables', {
    scope: 'world',
    config: false,
    type: Object,
    default: {},
  });

  addMacroTable(new FVTT_MacroTable());

  libWrapper.register(
    MODULE_ID,
    'TextEditor.enrichHTML',
    function (wrapped: (c: string, o?: object) => string, content: string, options?: object) {
      // Recursively process the HTML as text
      const result = wrapped(expand(content), options);
      return result;
    },
    'WRAPPER',
  );

  // @ts-expect-error Module type not extended for `api`
  game.modules.get(MODULE_ID).api = API;

  Hooks.callAll(`${MODULE_ID}Ready`, game.modules?.get(MODULE_ID).api);
}
