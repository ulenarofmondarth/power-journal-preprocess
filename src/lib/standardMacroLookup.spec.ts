import { describe, it, expect, vi, beforeAll } from 'vitest';

import { addMacroTable, standardMacroLookup } from './standardMacroLookup';

describe('standardMacroLookup', () => {
  it('finds an internal macro', () => {
    const macroName = 'if';

    expect(standardMacroLookup(macroName)).toBeTypeOf('function');
  });

  describe('with FVTT', async () => {
    const FVTT_MacroTable = await import('@lib/fvtt/macroTable');

    beforeAll(async () => {
      addMacroTable(new FVTT_MacroTable.default());
    });

    it('finds a foundryvtt macro by name', async () => {
      const macrotableSpy = vi
        .spyOn(FVTT_MacroTable.default.prototype, 'get')
        .mockReturnValue(() => ({ result: 'test', errors: [] }));
      const macroName = 'mymacro';

      expect(standardMacroLookup(macroName)).toBeTypeOf('function');
      expect(macrotableSpy).toBeCalled();
    });
  });
});
