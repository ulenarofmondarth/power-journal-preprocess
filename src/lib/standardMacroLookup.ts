/**
 * standardMacroLookup
 *
 * Lookup macro name using cascade of macro tables
 */
import internalMacros from './internalMacros';

export interface MacroResult {
  result: string;
  errors: string[];
}

export type Macro = (...args: string[]) => MacroResult;
export type MacroLookup = (name: string) => undefined | Macro;
export type MacroTable = Map<string, Macro>;

const macrotables: MacroTable[] = [];

addMacroTable(internalMacros);

function standardMacroLookup(name: string): undefined | Macro {
  let macro;

  for (const macroTable of macrotables) {
    macro = macroTable.get(name);
    if (typeof macro === 'function') break;
  }
  return macro;
}

function addMacroTable(table: MacroTable) {
  if (!macrotables.includes(table)) {
    macrotables.unshift(table);
  }
}

export { addMacroTable, standardMacroLookup };
