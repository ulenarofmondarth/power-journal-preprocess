import { localize } from '@lib/helpers';
import { save } from '@lib/variableStore';

import type { MacroResult } from '@lib/standardMacroLookup';

export default function (name: string, value: string): MacroResult {
  try {
    save(name, value);
    return { result: '', errors: [] };
  } catch (e) {
    console.error(`varMacro error: ${e}`);
    return {
      result: 'ERROR',
      errors: [localize('MON-PJE.ERROR.badvarlookup')],
    };
  }
}
