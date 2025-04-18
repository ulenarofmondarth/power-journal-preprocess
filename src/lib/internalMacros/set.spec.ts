import { describe, it, expect, afterEach, vi } from 'vitest';
import setMacro from './set';
import { localize } from '@lib/helpers';
import { save } from '@lib/variableStore';

vi.mock('@lib/helpers');
vi.mock('@lib/variableStore', { spy: true });

describe('varMacro', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(localize).mockImplementation((x: string) => x);
  });

  it('associates a value with a variable', () => {
    expect(setMacro('a', 'val').result).toEqual('');
    expect(save).toHaveBeenCalled();
  });
});
