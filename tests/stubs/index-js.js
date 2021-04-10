const indexJsContent = 'export { default, propTypes } from \'./promo-banner\';\n'
  + '\n'
  + 'require(\'./__content/promo-banner__content.scss\');\n'
  + 'require(\'./__content/_hidden/promo-banner__content_hidden.scss\');\n'
  + 'require(\'./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss\');\n'
  + '\n'
  + 'require(\'./promo-banner.scss\');\n'
  + '\n'
  + 'require(\'./_disabled/promo-banner_disabled.scss\');\n'
  + 'require(\'./_theme/_ocean/promo-banner_theme_ocean.scss\');\n';

module.exports = indexJsContent;
