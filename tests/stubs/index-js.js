const os = require('os');

const { EOL } = os;

const indexJsMockContent = `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}`;

module.exports = indexJsMockContent;
