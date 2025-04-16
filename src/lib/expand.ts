import { localize } from './helpers';
import { standardMacroLookup } from './standardMacroLookup';

import type { Macro, MacroLookup } from './standardMacroLookup';

function expand(content: string, macroLookup: MacroLookup = standardMacroLookup): string | [string, string] {
  let remainingContent=content;
  let result = '';

  do {
    const openMacro = remainingContent.search(/{{/);
    const closeMacro = remainingContent.search(/}}/);

    if (openMacro >= 0 || closeMacro >= 0) {
      if (closeMacro >= 0 && (openMacro < 0 || closeMacro < openMacro)) {
        const [fn, args]: [string, string[]] = parseMacroBlock(result.concat(remainingContent.slice(0, closeMacro)));
        remainingContent = remainingContent.slice(closeMacro + 2);
        if (!fn) {
          return [localize('MON-PJE.ERROR.badfunc'), remainingContent];
        }
        const macro: undefined | Macro = macroLookup(fn);

        if (macro) {
          return [macro(...args), remainingContent];
        }
      } else {
        const prolog = remainingContent.slice(0, openMacro);
        let expansion = expand(remainingContent.slice(openMacro + 2), macroLookup);
        if (typeof expansion === 'string') {
          // Mistmatched {{}}
          expansion = remainingContent.slice(openMacro);
          remainingContent = '';
        }
        else {
          [expansion, remainingContent] = expansion;
        }
        result = result.concat(prolog, expansion);
      }
    } else {
      result = (!result) ? content : result.concat(remainingContent);
      remainingContent = "";
    }
  } while (remainingContent);

  return result;
}

function parseMacroBlock(block: string): [string, string[]] {
  let remainingBlock = block.trim();
  let fn = remainingBlock.match(/^(((["']).*?(?<!\\)\3)|[^"']\S*)/)?.[0]
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
