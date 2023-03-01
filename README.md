# Xmartlabs Create React App Template

![react version](https://img.shields.io/badge/react-18.0.0-brightgreen)
![react-dom version](https://img.shields.io/badge/react--dom-18.0.0-brightgreen)
![react-router-dom version](https://img.shields.io/badge/react--router--dom-5.3.3-brightgreen)
![history version](https://img.shields.io/badge/history-4.10.1-brightgreen)
![node-sass version](https://img.shields.io/badge/node--sass-6.0.1-brightgreen)
![jest version](https://img.shields.io/badge/jest-27.4.3-brightgreen)
![axios version](https://img.shields.io/badge/axios-0.21.1-brightgreen)
![eslint version](https://img.shields.io/badge/eslint-8.10.0-brightgreen)

This project contains Xmartlabs' Create React App template.
If you want to know more about what the template itself provides, then read the template's Readme located in [`/template/README.md`](./template/README.md).

## Contributing to this Template

Make sure you have the appropriate version of Node (16.5.0) and NPM (7.24.0) installed.

Then install the required packages:

```shell
npm install
```

To run tests you'll need to create a `.env` file. You can simply copy the example file (`.env.example`) and rename it. In general, since the environment file will be used only for testing, any value for the environment variables will work.

Tests are run using the typical command:

```shell
npm test
```

Since this is a template project, the best way to test what you develop is by actually creating a project from it. There's a quick way to do it by running:

```shell
npm run create-test-project
```

That command will create a new project from the template on the `project-test` directory (which is conveniently ignored by git).

It's recommended you make all the changes you want on the test project and then import them into the actual template. You can do so with this command:

```shell
npm run import-changes
```

The command runs through all the files on the test project and compares them to the template. If the files are different (or new) the command asumes that the file on the test project has newer changes. After computing those files, the utility will show you what files it wants to import into the template and you can decide if you want to run the import or not. This also applies to files that might have been deleted from the original template.

**IMPORTANT**: make sure that you actually want to import the files, as the command does not really know if your template has newer changes. You might overwrite a file that you needed. It's recommended to commit your changes on the template before importing, just in case you lose progress.

**IMPORTANT**: changes on the `package.json` or `package-lock.json` files are ignored as they don't map to a file on the template itself. If you install a new package on the test project, make sure to add that dependency on the `template.json` file.

## Generate a Project with this Template

1. Clone this repo:

```shell
git clone git@github.com:xmartlabs/cra-template-xmartlabs.git
```

2. From the directory you want to create your new app in, run:

```shell
npx create-react-app your-app --template file:cra-template-xmartlabs --use-npm
```

3. Then run the following command to start:

```shell
cd your-app && npm start
```

4. Read the template's Readme at [`/template/README.md`](./template/README.md) for post installation instructions

## Unsupported Features

### PWA

As of this moment this template does not support PWA mode instantly. If you want to add support for PWAs please refer to [cra-template-pwa](https://github.com/cra-template/pwa/tree/master/packages/cra-template-pwa-typescript) for more information on how you could go about setting up.
