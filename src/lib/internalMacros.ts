import type { MacroTable } from './standardMacroLookup';
import ifMacro from './internalMacros/if';

const TABLE: MacroTable = {
  if: ifMacro,
};

export default TABLE;
