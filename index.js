// eslint-disable-next-line import/no-extraneous-dependencies
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const COMPONENTS_FOLDER_PATH = 'src/app/components/';
const ELEMENT_SIGN = '__';
const MOD_SIGN = '_';
const STYLE_FILE_EXTENSION = '.scss';

const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH, { ignored: /^\./, persistent: true });

function isEmpty(filePath) {
  return fs.readdirSync(filePath).length === 0;
}

function isElementFolder(filePath) {
  return path.basename(filePath).includes(ELEMENT_SIGN);
}

function isModFolder(filePath) {
  return path.basename(filePath).includes(MOD_SIGN)
    && !isElementFolder(filePath);
}

function getBlockName(filePath) {
  return filePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(/\/.{1,}/, '');
}

function getElementName(filePath) {
  return filePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(`${getBlockName(filePath)}/`, '')
    .replace(/\/.{1,}/, '');
}

function getModName(filePath) {
  return path.basename(filePath);
}

function getNewElementContent(blockName, elementName) {
  return `.${blockName}${elementName} {\n  \n}`;
}

function getNewElementModContent(blockName, elementName, modName) {
  return `.${blockName}${elementName}${modName} {\n  \n}`;
}

function getNewBlockModContent(blockName, modName) {
  return `.${blockName}${modName} {\n  \n}`;
}

function createElementFile(filePath) {
  const blockName = getBlockName(filePath);
  const elementName = getElementName(filePath);

  const newFilePath = `${filePath}/${blockName}${elementName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewElementContent(blockName, elementName));
}

function createElementModFile(filePath) {
  const blockName = getBlockName(filePath);
  const elementName = getElementName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${elementName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewElementModContent(blockName, elementName, modName));
}

function createBlockModFile(filePath) {
  const blockName = getBlockName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewBlockModContent(blockName, modName));
}

function createModFile(filePath) {
  return filePath.includes(ELEMENT_SIGN)
    ? createElementModFile(filePath)
    : createBlockModFile(filePath);
}

function onDirAdd(filePath) {
  if (isEmpty((filePath))) {
    if (isElementFolder(filePath)) createElementFile(filePath);
    if (isModFolder(filePath)) createModFile(filePath);
  }
}

function onReady() {
  console.log('Watching is activated');

  watcher
    .on('addDir', onDirAdd);
}

module.exports = () => watcher.on('ready', onReady);
