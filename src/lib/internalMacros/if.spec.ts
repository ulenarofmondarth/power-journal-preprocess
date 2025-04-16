import { describe, it, expect, afterEach, vi } from 'vitest';
import ifMacro from './if';
import { localize } from '@lib/helpers';

vi.mock('@lib/helpers');

describe('ifMacro', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns second arg if first evaluates to true', () => {
    const args = ['1==1', 'isTrue', 'isFalse'] as const;
    const correctResult = 'isTrue';

    expect(ifMacro(...args).result).toEqual(correctResult);
  });

  it('returns third argument if first evaluates to false', () => {
    const args = ['1==2', 'isTrue', 'isFalse'] as const;
    const correctResult = 'isFalse';

    expect(ifMacro(...args).result).toEqual(correctResult);
  });

  it('returns empty string on false condition with no falsy value', () => {
    const args = ['1==2', 'isTrue'] as const;
    const correctResponse = '';

    expect(ifMacro(...args).result).toEqual(correctResponse);
  });

  it('returns an error message if condition does not evaluate', () => {
    const args = ['1=2', 'isTrue'] as const;
    const correctResponse = 'error in if condition, see console for more';
    vi.mocked(localize).mockReturnValue(correctResponse);

    expect(ifMacro(...args).errors?.[0]).toEqual(correctResponse);
  });
});
