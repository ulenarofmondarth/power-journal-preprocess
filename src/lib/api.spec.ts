import { describe, it, expect, vi } from 'vitest';
import * as API from './api';
import { expand } from '@lib/expand';
import type { MacroResult } from './standardMacroLookup';

function testMacro(): MacroResult {
  return { result: '', errors: [] };
}

describe('api', () => {
  it('allows module to register macro function', () => {
    const moduleid = 'testmod';
    const macroname = 'testmacro';
    const macroFunction = testMacro;

    expect(() => API.registerMacro(moduleid, macroname, macroFunction)).not.toThrow();
  });

  it('throws error if attempting to register existing macro name', () => {
    const moduleid = 'testmod';
    const macroname = 'testmacroduplicate';
    const macroFunction = testMacro;

    API.registerMacro(moduleid, macroname, macroFunction);
    expect(() => API.registerMacro(moduleid, macroname, macroFunction)).toThrow();
  });

  it('allows module to register a macro with same name as internal macro', () => {
    const moduleId = 'testmod';
    const macroName = 'if';
    const macroFunction = testMacro;

    expect(() => API.registerMacro(moduleId, macroName, macroFunction)).not.toThrow();
  });

  it('shadows existing macro when registering one with same name', () => {
    const moduleId = 'testmod';
    const macroName = 'var';
    const macroFunction = vi.fn(testMacro);
    const content = '{{var | A}}';

    expand(content);
    expect(macroFunction).not.toHaveBeenCalled();
    API.registerMacro(moduleId, macroName, macroFunction);
    expand(content);
    expect(macroFunction).toHaveBeenCalledOnce();
  });
});
