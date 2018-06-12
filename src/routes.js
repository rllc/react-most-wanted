import React from 'react'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'

const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncPlayer = MyLoadable({ loader: () => import('./containers/Sermons/SermonPlayer') });
const AsyncSermon = MyLoadable({ loader: () => import('./containers/Sermons/Sermon') });
const AsyncSermons = MyLoadable({ loader: () => import('./containers/Sermons/Sermons') }, [AsyncSermon]);

const Routes = [
    <RestrictedRoute type='private' path="/" exact component={AsyncSermons} />,
    <RestrictedRoute type='private' path="/sermons" exact component={AsyncSermons} />,
    <RestrictedRoute type='private' path="/sermons/play/:uid" exact component={AsyncPlayer} />,
    <RestrictedRoute type='private' path="/sermons/edit/:uid" exact component={AsyncSermon} />,
]


export default routes;