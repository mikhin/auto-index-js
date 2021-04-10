const os = require('os');
const fs = require('fs');
const path = require('path');

const indexJsContent = require('./stubs/index-js');
const deletingDirectoryHandler = require('../src/handlers/delete-directory-handler');

const { EOL } = os;

let readFileSync;
let writeFileSync;

describe('Deleting files', () => {
  beforeEach(() => {
    readFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => indexJsContent);
    writeFileSync = jest.spyOn(fs, 'writeFileSync');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deleting BEM element folder', () => {
    const deletedFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content');

    deletingDirectoryHandler(deletedFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}`);
  });

  it('create BEM element\'s boolean modifier folder', () => {
    const deletedFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content', '_hidden');

    deletingDirectoryHandler(deletedFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}`);
  });

  it('create BEM element\'s key-value modifier folder', () => {
    const deletedFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content', '_theme', '_ocean');

    deletingDirectoryHandler(deletedFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}`);
  });

  it('create BEM block\'s boolean modifier folder', () => {
    const deletedFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_disabled');

    deletingDirectoryHandler(deletedFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}${EOL}`);
  });

  it('create BEM block\'s key-value modifier folder', () => {
    const deletedFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_theme', '_ocean');

    deletingDirectoryHandler(deletedFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(1);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', 'index.js'),
      `export { default, propTypes } from './promo-banner';${EOL}${EOL}require('./__content/promo-banner__content.scss');${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}${EOL}require('./promo-banner.scss');${EOL}${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}${EOL}`);
  });
});
