import { localize } from './helpers';
import { standardMacroLookup } from './standardMacroLookup';

import type { Macro, MacroLookup } from './standardMacroLookup';

export interface ExpandedContent {
  expanded: string;
  remaining: string;
  errors?: string[];
}

function expand(content: string, macroLookup: MacroLookup = standardMacroLookup): string {
  const result =_expand(content, macroLookup);
  const errors = (result?.errors) ? JSON.stringify(result.errors) : '';
  return `${result.expanded}${errors}`;
}

function _expand(content: string, macroLookup: MacroLookup = standardMacroLookup, depth = 0): ExpandedContent {
  const result: ExpandedContent = {
    expanded: '',
    remaining: content,
  };

  do {
    const openMacro = result.remaining.search(/{{/);
    const closeMacro = result.remaining.search(/}}/);

    if (openMacro >= 0 || closeMacro >= 0) {
      if (closeMacro >= 0 && (openMacro < 0 || closeMacro < openMacro)) {
        const [fn, args]: [string, string[]] = parseMacroBlock(
          result.expanded.concat(result.remaining.slice(0, closeMacro)),
        );
        result.remaining = result.remaining.slice(closeMacro + 2);
        if (!fn) {
          (result.errors ?? (result.errors = [])).push(localize('MON-PJE.ERROR.badfunc'));
          return result;
        }
        const macro: undefined | Macro = macroLookup(fn);

        if (macro) {
          const { result: expandedMacro, errors } = macro(...args);
          result.expanded = expandedMacro;
          if (errors) {
            (result.errors ?? (result.errors = [])).push(...errors);
          }

          return result;
        }
      } else {
        const prolog = result.remaining.slice(0, openMacro);
        const expansion = _expand(result.remaining.slice(openMacro + 2), macroLookup, depth+1);
        if (expansion.errors) {
          
          (result.errors ?? (result.errors = [])).push(...expansion.errors);
          result.expanded = result.remaining.slice(openMacro);
          result.remaining = '';
        }
        else {
        result.expanded = result.expanded.concat(prolog, expansion.expanded);
        result.remaining = expansion.remaining;
        }
      }
    } else {
      if (depth > 0 && result.remaining.search(/}}/) < 0) { // we expect }} to close the expansion, if missing...
        result.expanded ='{{'.concat(result.expanded); 
      }

      result.expanded = result.expanded.concat(result.remaining);
      result.remaining = '';
    }
  } while (result.remaining);

  return result;
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
