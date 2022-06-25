// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebaseConfig: {
    apiKey: 'AIzaSyBOOZUNKTAPJWOI6JOZjwEzknmaktDoiiE',
    authDomain: 'palmera-5bccc.firebaseapp.com',
    projectId: 'palmera-5bccc',
    storageBucket: 'palmera-5bccc.appspot.com',
    messagingSenderId: '105721021504',
    appId: '1:105721021504:web:31182c6a6a64dc2f2fcba5',
  },

  firebaseConfig2: {
    apiKey: 'AIzaSyBOOZUNKTAPJWOI6JOZjwEzknmaktDoiiE',
    authDomain: 'palmera-5bccc.firebaseapp.com',
    databaseURL: 'https://palmera-5bccc-default-rtdb.firebaseio.com',
    projectId: 'palmera-5bccc',
    storageBucket: 'palmera-5bccc.appspot.com',
    messagingSenderId: '105721021504',
    appId: '1:105721021504:web:31182c6a6a64dc2f2fcba5',
  },
  inputCodeConfig :{
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  },
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
