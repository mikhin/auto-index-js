const os = require('os');
const fs = require('fs');
const path = require('path');

const addDirectoryHandler = require('../src/handlers/add-directory-handler');

const { EOL } = os;

let readFileSync;
let writeFileSync;

describe('generateFiles', () => {
  beforeEach(() => {
    readFileSync = jest.spyOn(fs, 'readFileSync');
    writeFileSync = jest.spyOn(fs, 'writeFileSync');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create BEM element folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__content', 'promo-banner__content.scss'), `.promo-banner__content {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'), `${EOL}require('./__content/promo-banner__content.scss');${EOL}`);
  });

  it('create BEM element\'s boolean modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content', '_hidden');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__content', '_hidden', 'promo-banner__content_hidden.scss'), `.promo-banner__content_hidden {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'), `${EOL}require('./__content/_hidden/promo-banner__content_hidden.scss');${EOL}`);
  });

  it('create BEM element\'s key-value modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '__content', '_theme', '_ocean');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '__content', '_theme', '_ocean', 'promo-banner__content_theme_ocean.scss'), `.promo-banner__content_theme_ocean {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'), `${EOL}require('./__content/_theme/_ocean/promo-banner__content_theme_ocean.scss');${EOL}`);
  });

  it('create BEM block\'s boolean modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_disabled');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '_disabled', 'promo-banner_disabled.scss'), `.promo-banner_disabled {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'), `${EOL}require('./_disabled/promo-banner_disabled.scss');${EOL}`);
  });

  it('create BEM block\'s key-value modifier folder', () => {
    const createdFolderPath = path.join('src', 'app', 'components', 'promo-banner', '_theme', '_ocean');

    addDirectoryHandler(createdFolderPath);

    expect(readFileSync).toHaveBeenCalledWith(path.join('src', 'app', 'components', 'promo-banner', 'index.js'), { encoding: 'utf-8' });
    expect(writeFileSync).toHaveBeenCalledTimes(2);
    expect(writeFileSync).toHaveBeenNthCalledWith(1, path.join('src', 'app', 'components', 'promo-banner', '_theme', '_ocean', 'promo-banner_theme_ocean.scss'), `.promo-banner_theme_ocean {${EOL}  ${EOL}}`);
    expect(writeFileSync).toHaveBeenNthCalledWith(2, path.join('src', 'app', 'components', 'promo-banner', 'index.js'), `${EOL}require('./_theme/_ocean/promo-banner_theme_ocean.scss');${EOL}`);
  });
});
