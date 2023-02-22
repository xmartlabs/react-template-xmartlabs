const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_DIR = 'template';
const TEST_PROJECT_DIR = 'project-test';
const TEST_PROJECT_PATH = path.join(ROOT_DIR, TEST_PROJECT_DIR);

const IGNORED_FILES = [
  'node_modules',
  '.env.development.local',
  '.env.test.local',
  'package.json',
  'package-lock.json',
  '.gitignore',
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

/**
 * Given a list of file paths inside the test project directory, this method
 * compares those files to the template directory and returns only those that are
 * new or that are different to the ones on the template project.
 */
const filterFiles = (files) => files.filter((f) => {
  const relativeFilePath = f.replace(TEST_PROJECT_PATH, '');
  const templateFile = path.join(ROOT_DIR, TEMPLATE_DIR, relativeFilePath);
  // Check that the file already exists on the template project. If not, then don't filter it.
  if (!fs.existsSync(templateFile)) {
    return true;
  }
  // If the file exists then remove from the list if it has not been changed.
  if (!fs.readFileSync(f).equals(fs.readFileSync(templateFile))) {
    return true;
  }
  return false;
});

/**
 * Given a list of file paths inside the test project directory, this method
 * copies all the files to the appropriate relative location in the template directory.
 */
const importFiles = (files) => {
  files.forEach((f) => {
    const relativeFilePath = f.replace(TEST_PROJECT_PATH, '');
    const templateFile = path.join(ROOT_DIR, TEMPLATE_DIR, relativeFilePath);

    fs.copyFileSync(f, templateFile);
  })
}

const main = async () => {
  console.log();
  if (!fs.existsSync(TEST_PROJECT_PATH)) {
    errorAndExit('Test project directory not found. Please make sure that you have created a test project using `npm run create-test-project`.')
  }

  const validFiles = getValidFiles(TEST_PROJECT_PATH);
  const filteredFiles = filterFiles(validFiles);

  if (!filteredFiles.length) {
    console.log('No files found to import. Aborting.');
    return;
  }

  console.log('Files that are different:');
  filteredFiles.forEach(f => {
    console.log(`  ${f.replace(TEST_PROJECT_PATH, '').replace(/^\//, '')}`);
  })
  console.log();
  const response = await askQuestion('Import those files into the template? Keep in mind that the files will be completely replaced. (y/N)');
  if (response === 'y' || response === 'Y') {
    importFiles(filteredFiles);
  }
};

main();
