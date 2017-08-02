// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  zendesk: {
    username: 'frowe.m@cambridgeesol.org',
    token: '',
    //subdomain: 'esolhelpdesk1380528590',
    remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2',
    hcremoteUri: 'https://esolhelpdesk1380528590.zendesk.com/api/v2/help_center',
    incremental_remoteUri: 'https://esolhelpdesk1380528590.zendesk.com/hc/api/v2'
  },
  firebase: {
    apiKey: "",
    authDomain: "help-center-56d1d.firebaseapp.com",
    databaseURL: "https://help-center-56d1d.firebaseio.com",
    projectId: "help-center-56d1d",
    storageBucket: "help-center-56d1d.appspot.com",
    messagingSenderId: "732551193427"
  }
}