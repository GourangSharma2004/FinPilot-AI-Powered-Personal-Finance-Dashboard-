import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import AppRoute from "./routes/route";

// Import scss
import "./assets/scss/theme.scss";

// Fake backend
import fakeBackend from './helpers/AuthType/fakeBackend';

// Initialize fake backend
fakeBackend();

const App = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <AppRoute>
                <Layout>
                  {route.component}
                </Layout>
              </AppRoute>
            }
            exact={true}
          />
        ))}
        
        {/* Test route */}
        <Route
          path="/test-income"
          element={
            <div>
              <h1>Test Income Page</h1>
              <p>This is a test page to verify routing is working</p>
            </div>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  layout: state.Layout,
});

const ConnectedApp = connect(mapStateToProps, null)(App);

export default ConnectedApp;
