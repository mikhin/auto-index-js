// eslint-disable-next-line import/no-extraneous-dependencies
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const COMPONENTS_FOLDER_PATH = 'src/app/components/';
const ELEMENT_SIGN = '__';
const MOD_SIGN = '_';
const STYLE_FILE_EXTENSION = '.scss';

const watcher = chokidar.watch(COMPONENTS_FOLDER_PATH, {
  ignored: /^\./,
  persistent: true,
});

function isEmpty(filePath) {
  return fs.readdirSync(filePath).length === 0;
}

function isElementFolder(filePath) {
  return path.basename(filePath)
    .includes(ELEMENT_SIGN);
}

function isModFolder(filePath) {
  return path.basename(filePath)
    .includes(MOD_SIGN)
    && !isElementFolder(filePath);
}

function isBoolModFolder(filePath) {
  return filePath.split('/')
    .filter((folder) => folder.includes(MOD_SIGN) && !folder.includes(ELEMENT_SIGN))
    .length === 1;
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

function getBoolModName(filePath) {
  const modFolders = filePath.split('/')
    .filter((folder) => folder.includes(MOD_SIGN) && !folder.includes(ELEMENT_SIGN));
  return modFolders[0];
}

function getModName(filePath) {
  return path.basename(filePath);
}

function getNewElementContent(blockName, elementName) {
  return `.${blockName}${elementName} {\n  \n}`;
}

function getNewElementBoolModContent(blockName, elementName, modName) {
  return `.${blockName}${elementName}${modName} {\n  \n}`;
}

function getNewElementModContent(blockName, elementName, boolModName, modName) {
  return `.${blockName}${elementName}${boolModName}${modName} {\n  \n}`;
}

function getNewBlockBoolModContent(blockName, modName) {
  return `.${blockName}${modName} {\n  \n}`;
}

function getNewBlockModContent(blockName, boolModName, modName) {
  return `.${blockName}${boolModName}${modName} {\n  \n}`;
}

function updateIndex(filePath, newFilePath) {
  const indexPath = `./${COMPONENTS_FOLDER_PATH}${getBlockName(filePath)}/index.js`;
  const indexContent = fs.readFileSync(indexPath, { encoding: 'utf-8' });
  const relativeNewFilePath = `.${newFilePath
    .replace(COMPONENTS_FOLDER_PATH, '')
    .replace(getBlockName(filePath), '')}`;

  if (indexContent.includes(relativeNewFilePath)) return undefined;

  const newFilePathRequiringText = `require('${relativeNewFilePath}');`;
  const indexContentStrings = indexContent.split('\n');
  const newFileContent = [...indexContentStrings, newFilePathRequiringText].join('\n');

  return fs.writeFileSync(indexPath, newFileContent);
}

function createElementFile(filePath) {
  const blockName = getBlockName(filePath);
  const elementName = getElementName(filePath);

  const newFilePath = `${filePath}/${blockName}${elementName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewElementContent(blockName, elementName));

  updateIndex(filePath, newFilePath);
}

function createElementBoolModFile(filePath) {
  const blockName = getBlockName(filePath);
  const elementName = getElementName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${elementName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewElementBoolModContent(blockName, elementName, modName));
}

function createElementModFile(filePath) {
  const blockName = getBlockName(filePath);
  const elementName = getElementName(filePath);
  const boolModName = getBoolModName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${elementName}${boolModName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath,
    getNewElementModContent(blockName, elementName, boolModName, modName));
}

function createBlockBoolModFile(filePath) {
  const blockName = getBlockName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewBlockBoolModContent(blockName, modName));
}

function createBlockModFile(filePath) {
  const blockName = getBlockName(filePath);
  const boolModName = getBoolModName(filePath);
  const modName = getModName(filePath);

  const newFilePath = `${filePath}/${blockName}${boolModName}${modName}${STYLE_FILE_EXTENSION}`;

  fs.writeFileSync(newFilePath, getNewBlockModContent(blockName, boolModName, modName));
}

function createBoolModFile(filePath) {
  return filePath.includes(ELEMENT_SIGN)
    ? createElementBoolModFile(filePath)
    : createBlockBoolModFile(filePath);
}

function createModFile(filePath) {
  return filePath.includes(ELEMENT_SIGN)
    ? createElementModFile(filePath)
    : createBlockModFile(filePath);
}

function onDirAdd(filePath) {
  if (isEmpty(filePath)) {
    if (isElementFolder(filePath)) createElementFile(filePath);
    if (isModFolder(filePath) && isBoolModFolder(filePath)) createBoolModFile(filePath);
    if (isModFolder(filePath) && !isBoolModFolder(filePath)) createModFile(filePath);
  }
}

function onReady() {
  watcher
    .on('addDir', onDirAdd);

  console.log('Watching is active');
}

onReady();
