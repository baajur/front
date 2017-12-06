import createInitialBrowserRouter from 'found/lib/createInitialBrowserRouter';
import createRender from 'found/lib/createRender';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';

import App from './components/App';

(async () => {
  const BrowserRouter = await createInitialBrowserRouter({
    routeConfig: makeRouteConfig((
      <Route path="/">
        <Route Component={App} />
        <Route path="/info" render={() => <div>Some useful info.</div>} />
        <Route path="/login" render={() => <div>Login here.</div>} />
      </Route>
    )),
    render: createRender({
      renderError: ({ error }) => ( // eslint-disable-line react/prop-types
        <div>
          {error.status === 404 ? 'Not found' : 'Error'}
        </div>
      ),
    }),
  });

  ReactDOM.render(
    <BrowserRouter />,
    document.getElementById('root'),
  );
})();
