import { localize } from './helpers';
import { standardMacroLookup } from './standardMacroLookup';

import type { Macro, MacroLookup } from './standardMacroLookup';

export interface ExpandedContent {
  expanded: string;
  remaining: string;
  errors: string[];
}

function expand(content: string, macroLookup: MacroLookup = standardMacroLookup): string {
  const result = _expand(content, macroLookup);
  const errors = result.errors.length ? JSON.stringify(result.errors) : '';
  return `${result.expanded}${errors}`;
}

function _expand(content: string, macroLookup: MacroLookup = standardMacroLookup, depth = 0): ExpandedContent {
  let expanded = '';
  let remaining = content;
  const errors: string[] = [];

  do {
    const openMacro = remaining.search(/{{/);
    const closeMacro = remaining.search(/}}/);

    if (openMacro >= 0 || closeMacro >= 0) {
      if (closeMacro >= 0 && (openMacro < 0 || closeMacro < openMacro)) {
        const [fn, args]: [string, string[]] = parseMacroBlock(expanded.concat(remaining.slice(0, closeMacro)));
        const rollback = remaining;
        remaining = remaining.slice(closeMacro + 2);
        if (!fn) {
          errors.push(localize('MON-PJE.ERROR.badfunc'));
          return {
            expanded,
            remaining,
            errors,
          };
        }
        const macro: undefined | Macro = macroLookup(fn);

        if (macro) {
          const { result: expandedMacro, errors: macroErrors } = macro(...args);
          expanded = expandedMacro;
          if (macroErrors.length > 0) {
            errors.push(...macroErrors);
          }

          return {
            expanded,
            remaining,
            errors,
          };
        } else {
          errors.push(localize('MON-PJE.ERROR.toomanycloses'));
          expanded = rollback;
          remaining = '';
        }
      } else {
        const prolog = remaining.slice(0, openMacro);
        const expansion = _expand(remaining.slice(openMacro + 2), macroLookup, depth + 1);
        expanded = expanded.concat(prolog);
        if (expansion.errors.length > 0) {
          errors.push(...expansion.errors);
          expanded = expanded.concat(remaining.slice(openMacro));
          remaining = '';
        } else {
          remaining = expansion.expanded.concat(expansion.remaining);
          console.log(`exp "${expanded}" rem "${remaining}"`);
        }
      }
    } else {
      if (depth > 0 && remaining.search(/}}/) < 0) {
        // we expect }} to close the expansion, if missing...
        errors.push(localize('MON-JRE.ERROR.expectedclose'));
        expanded = '{{'.concat(expanded);
      }

      expanded = expanded.concat(remaining);
      remaining = '';
    }
  } while (remaining);

  return {
    expanded,
    remaining,
    errors,
  };
}

function parseMacroBlock(block: string): [string, string[]] {
  let remainingBlock = block.trim();
  let fn = remainingBlock.match(/^(((["']).*?(?<!\\)\3)|[^"']\S*)/)?.[0];
  remainingBlock = remainingBlock.slice(fn?.length).trim();
  fn = fn?.replace(/^["']/, '').replace(/["']$/, '');
  if (!fn) {
    return ['', []];
  }
  const separator = remainingBlock[0];
  remainingBlock = remainingBlock.slice(1);
  const args = remainingBlock.split(separator);

  return [fn.trim(), args.map(a => a.trim())];
}

export { expand };
