import type { Macro, MacroResult } from '../standardMacroLookup';

class MacroTable extends Map<string, Macro> {
  get(name: string): undefined | Macro {
    const fvttMacro = game.macros?.getName(name);

    if (fvttMacro) {
      return (...args: string[]): MacroResult => {
        try {
          const fvttReturn = new Function('scope', `"use strict";${fvttMacro.command};`)({ args });
          if (typeof fvttReturn === 'string') {
            return { result: fvttReturn, errors: [] };
          } else if (typeof fvttReturn === 'object') {
            const { result = 'No result', errors = [] } = fvttReturn;
            return { result, errors };
          }
        } catch (e) {
          const message = `Problem with user defined macro ${name}: see console for details`;
          ui.notifications?.error(message);
          console.log(e);
          return { result: '', errors: [message] };
        }

        return { result: '', errors: [] };
      };
    }

    return undefined;
  }
}

export default MacroTable;
