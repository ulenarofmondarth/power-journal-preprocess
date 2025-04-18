import { describe, it, expect, afterEach, vi } from 'vitest';
import varMacro from './var';
import { localize } from '@lib/helpers';
import { save } from '@lib/variableStore';

vi.mock('@lib/helpers');
//vi.mock('@lib/variableStore');

describe('varMacro', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(localize).mockImplementation((x: string) => x);
  });

  it('returns empty string if variable does not exist', () => {
    const correctResult = '';

    expect(varMacro('does-not-exist').result).toEqual(correctResult);
  });

  it('returns value associated with the variable', () => {
    //vi.mocked(lookup).mockImplementation((x) => (x === 'a') ? 'isTrue' : undefined);
    const correctResult = 'isTrue';
    save('a', 'isTrue');

    expect(varMacro('a').result).toEqual(correctResult);
  });
});
