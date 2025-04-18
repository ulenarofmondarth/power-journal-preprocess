import { localize } from '@lib/helpers';
import { lookup } from '@lib/variableStore';

import type { MacroResult } from '@lib/standardMacroLookup';

export default function (name: string): MacroResult {
  try {
    const value = lookup(name);
    return { result: value ?? '', errors: [] };
  } catch (e) {
    console.error(`varMacro error: ${e}`);
    return {
      result: 'ERROR',
      errors: [localize('MON-PJE.ERROR.badvarlookup')],
    };
  }
}
