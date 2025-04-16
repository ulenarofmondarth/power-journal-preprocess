import { MODULE_ID } from './constants';
import { expand } from '@lib/expand';

export function powerEnhance() {
  libWrapper.register(
    MODULE_ID,
    'TextEditor.enrichHTML',
    function (wrapped: (c: string, o?: object) => string, content: string, options?: object) {
      // Recursively process the HTML as text
      console.log(`wrapper for enricher run ${JSON.stringify(expand(content))}`);

      const result = wrapped(expand(content), options);
      return result;
    },
    'WRAPPER',
  );
}
