// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBtCSq8hke5EBBPFxK8jZ7AsaLy5Lv9OHM',
    authDomain: 'expensify-75abf.firebaseapp.com',
    databaseURL: 'https://expensify-75abf.firebaseio.com',
    projectId: 'expensify-75abf',
    storageBucket: 'expensify-75abf.appspot.com',
    messagingSenderId: '988452474417'
  }
};
