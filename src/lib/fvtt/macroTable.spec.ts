import { describe, it, expect } from 'vitest';
import MacroTable from './macroTable';

describe.todo('FVTT MacroTable', () => {
  it('returns a macro by name', () => {
    const macroName = 'mmacro';
    const macroTable = new MacroTable();

    expect(macroTable.get(macroName));
  });
});
