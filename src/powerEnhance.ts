import { MODULE_ID } from '@lib/constants';
import { expand } from '@lib/expand';
import { addMacroTable } from '@lib/standardMacroLookup';
import FVTT_MacroTable from '@lib/fvtt/macroTable';

export function powerEnhance() {
  game.settings.register(MODULE_ID, 'variables', {
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
      console.log(`wrapper for enricher run ${JSON.stringify(expand(content))}`);

      const result = wrapped(expand(content), options);
      return result;
    },
    'WRAPPER',
  );
}
