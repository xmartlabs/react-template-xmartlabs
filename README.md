# Xmartlabs Create React App Template

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

## Generate a Project with this Template

1. From the directory you want to create your new app in, run:

```shell
npx create-react-app your-app --template xmartlabs --use-npm
```

2. Then run the following command to start:

```shell
cd your-app && npm start
```

3. Read the template's Readme at [`/template/README.md`](./template/README.md) for post installation instructions

## Unsupported Features

### PWA

As of this moment this template does not support PWA mode instantly. If you want to add support for PWAs please refer to [cra-template-pwa](https://github.com/cra-template/pwa/tree/master/packages/cra-template-pwa-typescript) for more information on how you could go about setting up.
