import { initializeApp } from '@firebase/app';

let app;

export function getApp() {
  if (!app) {
    const settings = Noodl.getProjectSettings();
    app = initializeApp({
      apiKey: settings.firebaseApiKey,
      authDomain: settings.firebaseAuthDomain,
      projectId: settings.firebaseProjectId,
      storageBucket: settings.firebaseStorageBucket,
      messagingSenderId: settings.firebaseMessagingSenderId,
      appId: settings.firebaseAppId,
      measurementId: settings.firebaseMeasurementId,
    });
  }
  return app;
}
