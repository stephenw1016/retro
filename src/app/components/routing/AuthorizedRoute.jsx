// @flow
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { routes } from '../../constants';

type Props = {
  component: React.ComponentType,
}

const AuthorizedRoute = ({ component: Component, ...rest }: Props) => {
  const user = useAuth();

  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to={routes.SIGN_IN} />)}
    />
  );
};

export default AuthorizedRoute;
