import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


/**
 * Returns Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @returns {firebase.auth.Auth} - The Firebase Auth service interface
 */
export const auth = () => {
  return firebase.auth()
}

/**
 * Convenience method to initialize firebase app
 * https://firebase.google.com/docs/reference/js/firebase?authuser=1#initializeapp
 * @param  {Object} config - FIREBASE_CONFIG during the build process
 * @returns {firebase.app.App} - Creates and initializes a Firebase app instance.
 */
export const fBInit = (config) => {
  return firebase.initializeApp(config.FIREBASE_CONFIG)
}




