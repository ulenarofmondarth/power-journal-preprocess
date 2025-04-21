import type { Macro, MacroTable } from './standardMacroLookup';
import ifMacro from './internalMacros/if';
import varMacro from './internalMacros/var';
import setMacro from './internalMacros/set';

const TABLE: MacroTable = new Map<string, Macro>([
  ['if', ifMacro],
  ['var', varMacro],
  ['set', setMacro],
]);

export default TABLE;
