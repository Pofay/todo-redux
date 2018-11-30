This was the output of my tinkering with [react][react], [redux][redux], [redux-saga][saga] and [Google's Firestore][firestore] to create a Todo App with Realtime Functionalities which was based on [Dan Abramov's Tutorial in egghead.io][egghead.io].

I highly recommend the tutorial for beginners of redux since its a *free tutorial* and its really digestible.

This was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

* `yarn start`
* `yarn test`
* `yarn run build`
* `yarn run eject`

## Firestore Configuration

These are the `.env` keys to setup the `firestore.js`:

    REACT_APP_API_KEY=
    REACT_APP_AUTH_DOMAIN=
    REACT_APP_DB_URL=
    REACT_APP_PROJECT_ID=
    REACT_APP_STORAGE_BUCKET=
    REACT_APP_SENDER_ID=

[redux]: https://redux.js.org/
[react]: https://reactjs.org/
[saga]: https://redux-saga.js.org
[egghead.io]: https://egghead.io/courses/getting-started-with-redux
[firestore]: https://firebase.google.com/docs/firestore/

