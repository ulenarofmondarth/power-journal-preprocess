export function localize(jsonPath: string): string {
  return game.i18n?.localize(jsonPath) || '';
}
