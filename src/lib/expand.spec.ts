import { describe, it, expect, afterEach, vi } from 'vitest';

import { localize } from '@lib/helpers';
import * as SML from '@lib/standardMacroLookup';

import { expand } from './expand';

vi.mock('./helpers');

describe('expand', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(localize).mockImplementation((x: string) => x);
  });

  it('runs single macros', () => {
    const content = 'if 2==2 {{if | 2==2 | isTrue | isFalse }}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('runs single macros different separator', () => {
    const content = 'if 2==2 {{if , 2==2 , isTrue , isFalse }}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('runs quoted macro names', () => {
    const content = 'if 2==2 {{"if" | 2==2 | isTrue | isFalse }}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('error on unbalanced quoted macro name', () => {
    const content = '{{"if | 2==2 | isTrue | isFalse }}';
    const correctResult = 'Unrecognised macro function';
    vi.mocked(localize).mockReturnValue(correctResult);

    expect(expand(content)).toContain(correctResult);
  });

  it('runs multiple macros', () => {
    const content = 'if 2==2 {{if | 2==2 | isTrue | isFalse }} or not {{ if | 1==2 | isTrue | isFalse }}';
    const correctResult = 'if 2==2 isTrue or not isFalse';

    expect(expand(content)).toEqual(correctResult);
  });

  it('runs nested macros', () => {
    const content = 'if 2==2 {{if | {{ if | 1==2 | isTrue | 2==2 }} | isTrue | isFalse }}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('runs nested macros split across lines', () => {
    const content = `if 2==2 {{if | 
      {{ if | 1==2 | isTrue | 2==2 }}
      | isTrue | isFalse }}`;
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('imbalanced close fails to expand', () => {
    const content = '{"{if | 2==2 | isTrue | isFalse }}';
    const correctResult = content;
    vi.mocked(localize).mockReturnValue('Too many }}');

    const result = expand(content);
    expect(result).toContain(correctResult);
    expect(result).toContain('Too many }}');
  });

  it('imbalance fails to expand', () => {
    const content = 'if 2==2 {{if | 2==2 | isTrue | isFalse ';
    const correctResult = content;

    expect(expand(content)).toContain(correctResult);
  });

  it('nested imbalance fails to expand', () => {
    const content = 'if 2==2 {{if | {{ if | 1==2 | isTrue | 2==2}} | isTrue | isFalse';
    const correctResult = 'if 2==2 {{if | {{ if | 1==2 | isTrue | 2==2}} | isTrue | isFalse';

    expect(expand(content)).toContain(correctResult);
  });

  it('complex separator string recognised', () => {
    const content = 'if 2==2 {{if "-s-" 2==2 -s- isTrue-s-isFalse}}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('complex separator regex recognised', () => {
    const content = 'if 2==2 {{if /-{3}/ 2==2 --- isTrue---isFalse}}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('complex separator recognised with context', () => {
    const content = 'if 2==2 {{if "-s-" {{ if | 1==2 | isTrue | 2==2}} -s- isTrue-s-isFalse}}';
    const correctResult = 'if 2==2 isTrue';

    expect(expand(content)).toEqual(correctResult);
  });

  it('reports when bad function specified', () => {
    const content = 'if 2==2 {{badfunc }}';
    const correctResult = 'MON-PJE.ERROR.badfunc';

    expect(expand(content)).toContain(correctResult);
  });

  it('returns original content if it contains no macros', () => {
    const content = 'original with no expansion';

    expect(expand(content)).toEqual(content);
  });

  it('limits the number of times the same expansion function can run', async () => {
    const content = `{{ runaway }}`;
    const spy = vi.spyOn(SML, 'standardMacroLookup').mockReturnValue(() => ({ result: content, errors: [] }));

    expand(content);

    expect(spy).toHaveBeenCalledTimes(100);
  }, 5000);
});
