// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCNMAEHFEaZCM6BIidqv15UOkZuaZqve3Y",
    authDomain: "test-angular-ea38b.firebaseapp.com",
    projectId: "test-angular-ea38b",
    storageBucket: "test-angular-ea38b.appspot.com",
    messagingSenderId: "1040343472034",
    appId: "1:1040343472034:web:c8c2f96d6c08d4b0f504fb"
  },
  urlPais: 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
