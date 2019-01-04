import * as H from 'history';
import * as React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

export interface IConditionalRouteProps extends RouteProps {
  routeCondition: boolean;
  redirectTo: H.LocationDescriptor;
}

export class ConditionalRoute extends React.Component<IConditionalRouteProps> {
  public render() {
    // Extract RouteProps without component property to rest.
    const {
      component: Component,
      routeCondition,
      redirectTo,
      ...rest
    } = this.props;
    return <Route {...rest} render={this.renderFn} />;
  }

  private renderFn = (renderProps: RouteComponentProps<any>) => {
    if (this.props.routeCondition) {
      const { component: Component } = this.props;
      if (!Component) {
        return null;
      }
      return <Component {...renderProps} />;
    }

    return <Redirect to={this.props.redirectTo} />;
  };
}

export function connectConditionalRoute<S>(
  mapStateToProps: MapStateToPropsParam<IConditionalRouteProps, RouteProps, S>
) {
  return connect<IConditionalRouteProps, {}, RouteProps, S>(mapStateToProps)(
    ConditionalRoute
  );
}
