const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_DIR = 'template';
const TEMPLATE_PATH = path.join(ROOT_DIR, TEMPLATE_DIR);
const TEST_PROJECT_DIR = 'project-test';
const TEST_PROJECT_PATH = path.join(ROOT_DIR, TEST_PROJECT_DIR);

const IGNORED_FILES = [
  'node_modules',
  '.env.development.local',
  '.env.test.local',
  'package.json',
  'package-lock.json',
  '.gitignore',
  'gitignore',
];

const errorAndExit = (message) => {
  console.error(message);
  process.exit(1);
};

const askQuestion = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, response => {
      readlineInterface.close();
      resolve(response);
    })
  })
};

const setColor = (code) => {
  console.log(`\x1b[${code}m`);
};

const resetColor = () => {
  console.log('\x1b[0m');
}

/**
 * Given a directory, recursively finds all valid files to later (potentially) import.
 * Valid files are those that are actually files and that are not in the ignored files list.
*/
const getValidFiles = (dirPath, validFiles = []) => {
  files = fs.readdirSync(dirPath);

  files.forEach(f => {
    if (IGNORED_FILES.includes(f)) {
      return;
    }
    const filePath = path.join(dirPath, f);
    if (fs.statSync(filePath).isDirectory()) {
      validFiles = getValidFiles(filePath, validFiles);
    } else {
      validFiles.push(filePath);
    }
  })
  return validFiles;
};

const getDeletedFiles = (testFiles, templateFiles) => {
  const relativePathTestFiles = testFiles.map(f => f.replace(TEST_PROJECT_PATH, ''));
  const relativePathTemplateFiles = templateFiles.map(f => f.replace(TEMPLATE_PATH, ''));
  return relativePathTemplateFiles.filter(f => !relativePathTestFiles.find((tF) => tF === f));
}

/**
 * Given a list of file paths inside the test project directory, this method
 * compares those files to the template directory and returns only those that are
 * new or that are different to the ones on the template project.
 */
const computeFiles = (testFiles, templateFiles) => {
  const fileData = testFiles.reduce((acc, f) => {
    const relativeFilePath = f.replace(TEST_PROJECT_PATH, '');
    const templateFile = path.join(ROOT_DIR, TEMPLATE_DIR, relativeFilePath);
    // Check that the file already exists on the template project. If not, then don't filter it.
    if (!fs.existsSync(templateFile)) {
      acc.newFiles.push(f);
      return acc;
    }
    // If the file exists then remove from the list if it has not been changed.
    if (!fs.readFileSync(f).equals(fs.readFileSync(templateFile))) {
      acc.modifiedFiles.push(f);
    }
    return acc;
  }, {newFiles: [], modifiedFiles: []});

  fileData.deletedFiles = getDeletedFiles(testFiles, templateFiles);
  return fileData;
}

/**
 * Given a list of file paths inside the test project directory, this method
 * copies all the files to the appropriate relative location in the template directory.
 */
const importFiles = (files) => {
  const filesToCopy = [...files.newFiles, ...files.modifiedFiles];
  filesToCopy.forEach((f) => {
    const relativeFilePath = f.replace(TEST_PROJECT_PATH, '');
    const templateFile = path.join(TEMPLATE_PATH, relativeFilePath);

    fs.ensureDirSync(path.dirname(templateFile));
    fs.copyFileSync(f, templateFile);
  });

  files.deletedFiles.forEach((f) => {
    const relativeFilePath = f.replace(TEST_PROJECT_PATH, '');
    const templateFile = path.join(TEMPLATE_PATH, relativeFilePath);
    fs.rmSync(templateFile);
  });
}

const main = async () => {
  console.log();
  if (!fs.existsSync(TEST_PROJECT_PATH)) {
    errorAndExit('Test project directory not found. Please make sure that you have created a test project using `npm run create-test-project`.')
  }

  const validTestProjectFiles = getValidFiles(TEST_PROJECT_PATH);
  const validTemplateFiles = getValidFiles(TEMPLATE_PATH);

  const filteredFiles = computeFiles(validTestProjectFiles, validTemplateFiles);

  if (Object.values(filteredFiles).every(a => !a.length)) {
    console.log('No files found to import. Aborting.');
    return;
  }

  console.log('---- Summary of changes ----');
  if (filteredFiles.newFiles.length) {
    setColor('32');
    console.log('New files');
    filteredFiles.newFiles.forEach(f => {
      console.log(`  * ${f.replace(TEST_PROJECT_PATH, '').replace(/^\//, '')}`);
    })
    resetColor();
  }
  if (filteredFiles.modifiedFiles.length) {
    setColor('33');
    console.log('Modified files');
    filteredFiles.modifiedFiles.forEach(f => {
      console.log(`  * ${f.replace(TEST_PROJECT_PATH, '').replace(/^\//, '')}`);
    })
    resetColor();
  }
  if (filteredFiles.deletedFiles.length) {
    setColor('31');
    console.log('Deleted files');
    filteredFiles.deletedFiles.forEach(f => {
      console.log(`  * ${f.replace(TEST_PROJECT_PATH, '').replace(/^\//, '')}`);
    })
    resetColor();
  }
  console.log();
  const response = await askQuestion('Import those files into the template? Keep in mind that the files will be completely replaced. (y/N)');
  if (response === 'y' || response === 'Y') {
    importFiles(filteredFiles);
  }
};

main();
