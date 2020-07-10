// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'http://127.0.0.1:8000/api/v0/',
    API_URL_PUBLIC: 'http://127.0.0.1:8000/api/v0/',
    // API_URL: 'http://192.168.100.9:8000/api/v0/',
    // API_URL_PUBLIC: 'http://192.168.100.9:8000/api/v0/',
    CLIENT_SECRET: 'oSogUExmufqd0qxAEHdONZjdwh8wEcZ5AwZM2ORM',
    CLIENT_ID: 8,
    GRANT_TYPE: 'password',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
