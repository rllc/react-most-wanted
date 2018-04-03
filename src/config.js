import getMenuItems from './menuItems'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const config = {
  firebase_config: {
    apiKey: "AIzaSyBWlHtm8o__opkdIQ-kRiFGPD7ESzR8LhQ",
    authDomain: "archives-eee3a.firebaseapp.com",
    databaseURL: "https://archives-eee3a.firebaseio.com",
    projectId: "archives-eee3a",
    storageBucket: "archives-eee3a.appspot.com",
    messagingSenderId: "367292284136"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyC7TDEG6KFrrl4BsmMVYVr-I6FM2Fzkmu0",
    authDomain: "archives-dev.firebaseapp.com",
    databaseURL: "https://archives-dev.firebaseio.com",
    projectId: "archives-dev",
    storageBucket: "archives-dev.appspot.com",
    messagingSenderId: "111370350224"
  },
  firebase_providers: [
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com',
    'password',
    'phone'
  ],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
}

export default config
