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
    API_URL_EVAL: 'http://127.0.0.1:8000/api/eval/',

    // API_URL_AUTHENTICATION: 'http://www.pruebas.asistencia.yavirac.edu.ec/public/api/authentication/',
    // API_URL_IGNUG: 'http://www.pruebas.asistencia.yavirac.edu.ec/public/api/ignug/',
    // API_URL_ATTENDANCE: 'http://www.pruebas.asistencia.yavirac.edu.ec/public/api/attendance/',
    // API_URL_JOB_BOARD: 'http://www.pruebas.bolsa-empleo.yavirac.edu.ec/public/api/job_board/',
    // API_URL_WEB: 'http://www.pruebas.web.yavirac.edu.ec/public/api/web/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
