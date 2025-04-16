import { localize } from '@lib/helpers';

import type { MacroResult } from '@lib/standardMacroLookup';

export default function (condition: string, truthyValue: string, falsyValue: string = ''): MacroResult {
  try {
    return { result: eval?.(`"use strict";(${condition})`) ? truthyValue : falsyValue };
  } catch (e) {
    console.error(`ifMacro condition error: ${e}`);
    return {
      result: 'ERROR',
      errors: [localize('MON-PJE.ERROR.badifcond')],
    };
  }
}
