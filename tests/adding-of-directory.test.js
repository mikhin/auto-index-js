const os = require('os');
const fs = require('fs');
const path = require('path');

const indexJsContent = require('./stubs/index-js');
const addDirectoryHandler = require('../src/handlers/add-directory-handler');

const { EOL } = os;

let readFileSync;
let writeFileSync;

describe('Creating files', () => {
  beforeEach(() => {
    readFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => indexJsContent);
    writeFileSync = jest.spyOn(fs, 'writeFileSync');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create BEM element folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__title');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__title', 'promo-banner__title.scss'), `.promo-banner__title {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}require('./__title/promo-banner__title.scss');${EOL}`);
  });

  it('create BEM element\'s boolean modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__title', '_hidden');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__title', '_hidden', 'promo-banner__title_hidden.scss'), `.promo-banner__title_hidden {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}require('./__title/_hidden/promo-banner__title_hidden.scss');${EOL}`);
  });

  it('create BEM element\'s key-value modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__title', '_theme', '_sun');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__title', '_theme', '_sun', 'promo-banner__title_theme_sun.scss'), `.promo-banner__title_theme_sun {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}require('./__title/_theme/_sun/promo-banner__title_theme_sun.scss');${EOL}`);
  });

  it('create BEM block\'s boolean modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_hidden');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '_hidden', 'promo-banner_hidden.scss'), `.promo-banner_hidden {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}require('./_hidden/promo-banner_hidden.scss');${EOL}`);
  });

  it('create BEM block\'s key-value modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_theme', '_sun');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '_theme', '_sun', 'promo-banner_theme_sun.scss'), `.promo-banner_theme_sun {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}require('./_theme/_sun/promo-banner_theme_sun.scss');${EOL}`);
  });
});
