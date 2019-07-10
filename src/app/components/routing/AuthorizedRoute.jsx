// @flow
import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import { useAuth } from '../../hooks/useAuth';
import { routes } from '../../constants';

type Props = {
  component: React.ComponentType,
}

const AuthorizedRoute = ({ component: Component, ...rest }: Props) => {
  const user = useAuth();

  return (
    <Suspense fallback={<CircularProgress />}>
      <Route
        {...rest}
        render={props => (
          user ? <Component {...props} /> : <Redirect to={routes.SIGN_IN} />
        )}
      />
    </Suspense>
  );
};

export default AuthorizedRoute;
