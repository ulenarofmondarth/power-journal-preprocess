import { addMacroTable, type Macro, type MacroTable } from './standardMacroLookup';

const MODULE_MACRO_TABLES: Record<string, MacroTable> = {};

/**
 * Registers a new macro with power-journal
 */
export function registerMacro(moduleId: string, macroName: string, macroFunction: Macro): void {
  const moduleTable = getTableById(moduleId);

  if (moduleTable.get(macroName) === undefined) {
    moduleTable.set(macroName, macroFunction);
  } else {
    throw new Error(`Module ${moduleId} attempted to register macro named ${macroName} multiple times`);
  }
}

function getTableById(id: string) {
  if (MODULE_MACRO_TABLES[id] === undefined) {
    MODULE_MACRO_TABLES[id] = new Map<string, Macro>() as MacroTable;
    addMacroTable(MODULE_MACRO_TABLES[id]);
  }

  return MODULE_MACRO_TABLES[id];
}
