import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Login = lazy(() => import("../pages/LoginPage.js"));
const DataSetOption = lazy(() => import("../pages/DataSetOption.js"));
const Join = lazy(() => import("../pages/JoinPage.js"));
const About = lazy(() => import("../views/About.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Analysis = lazy(() => import("../views/Analysis.js"));
const Sensor = lazy(() => import("../views/Sensor.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const ReduxView = lazy(() => import("../pages/ReduxStateViewer"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      //    { path: "/", element: <Navigate to="/login" /> },
      { path: "/", element: <Starter /> },
      { path: "/sensor", element: <Sensor /> },
      { path: "/Starter", exact: true, element: <Starter /> },
      { path: "/dataset", exact: true, element: <DataSetOption /> },
      { path: "/Analysis", exact: true, element: <Analysis /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/join", exact: true, element: <Join /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/ReduxView", exact: true, element: <ReduxView /> },
    ],
  },
];
export default ThemeRoutes;
