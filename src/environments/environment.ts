// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL_AUTHENTICATION: 'http://127.0.0.1:8000/api/authentication/',
    API_URL_IGNUG: 'http://127.0.0.1:8000/api/ignug/',
    API_URL_ATTENDANCE: 'http://127.0.0.1:8000/api/attendance/',
    API_URL_JOB_BOARD: 'http://127.0.0.1:8000/api/job_board/',
    API_URL_WEB: 'http://127.0.0.1:8000/api/web/',
    //
    // API_URL_AUTHENTICATION: 'http://192.168.100.9:8000/api/authentication/',
    // API_URL_IGNUG: 'http://192.168.100.9:8000/api/ignug/',
    // API_URL_ATTENDANCE: 'http://192.168.100.9:8000/api/attendance/',
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
