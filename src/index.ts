import { powerEnhance } from './powerEnhance';

Hooks.once('ready', () => {
  if (!game.modules?.get('lib-wrapper')?.active && game.user?.isGM)
    ui.notifications?.error("Module power-journal requires the 'libWrapper' module. Please install and activate it.");
});

Hooks.once('init', powerEnhance);
