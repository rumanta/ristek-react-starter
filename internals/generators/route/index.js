/* eslint-disable */
const fs = require('fs');
const path = require('path');
const componentExists = require('../utils/componentExists');

function reducerExists(comp) {
  try {
    fs.accessSync(path.join(__dirname, `../../../app/containers/${comp}/reducer.js`), fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

module.exports = {
  description: 'Add a route',
  prompts: [{
    type: 'input',
    name: 'component',
    message: 'Which component should the route show?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? true : `"${value}" doesn't exist.`;
      }

      return 'The path is required';
    },
  }, {
    type: 'input',
    name: 'path',
    message: 'Enter the path of the route.',
    default: '/about',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true;
      }

      return 'path is required';
    },
  }, {
    type: 'confirm',
    name: 'wantExact',
    default: true,
    message: 'Do you want exact route?',
  }],

  // Add the route to the routes.js file above the error route
  // TODO smarter route adding
  actions: (data) => {
    actions = [];

    actions.push({
      type: 'modify',
      path: '../../src/containers/App/routes.js',
      pattern: /(import NotFoundPage from 'containers\/NotFoundPage';)/g,
      template: trimTemplateFile('import.hbs'),
    });

    actions.push({
      type: 'modify',
      path: '../../src/containers/App/routes.js',
      pattern: /(\s{\s{0,}'component': NotFoundPage })/g,
      template: trimTemplateFile('route.hbs'),
    });

    return actions;
  },
};
