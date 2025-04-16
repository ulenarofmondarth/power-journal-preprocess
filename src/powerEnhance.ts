import { MODULE_ID } from './constants';
import { expand } from './lib/expand';

export function powerEnhance() {
  libWrapper.register(
    MODULE_ID,
    'TextEditor.enrichHTML',
    function (wrapped: (c: string, o?: object) => string, content: string, options?: object) {
      // Recursively process the HTML as text
      console.log('wrapper for enricher run');

      let expandedContent = expand(content);
      if (typeof expandedContent !== 'string') {
        // If we do not get a string then something went horribly wrong with the expnsion
        // failsafe to original content
        expandedContent = content;
      }

      const result = wrapped(expandedContent, options);
      return result;
    },
    'WRAPPER',
  );
}
