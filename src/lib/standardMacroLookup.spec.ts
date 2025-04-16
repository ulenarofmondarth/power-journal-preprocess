import { describe, it, expect } from 'vitest';

import { standardMacroLookup } from './standardMacroLookup';

describe('standardMacroLookup', () => {
  it('finds a internal macro', () => {
    const macroName = 'if';

    expect(standardMacroLookup(macroName)).toBeTypeOf('function');
  });
});
