import { Routes, Route } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { RoleBasedRoute } from './RoleBasedRoute';

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout: string;
  roles: string[];
}

interface AuthenticatedRoutesProps {
  routes: RouteConfig[];
}

export function AuthenticatedRoutes({ routes }: AuthenticatedRoutesProps) {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;
        let wrappedComponent;

        if (route.layout === 'navigation') {
          wrappedComponent = (
            <Navigation>
              <Component />
            </Navigation>
          );
        } else if (route.layout === 'standalone') {
          wrappedComponent = <Component />;
        } else {
          wrappedComponent = <Component />;
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RoleBasedRoute roles={route.roles}>
                {wrappedComponent}
              </RoleBasedRoute>
            }
          />
        );
      })}
    </Routes>
  );
}
