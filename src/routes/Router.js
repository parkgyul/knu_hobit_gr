import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const DataSet = lazy(() => import("../views/DataSet.js"));

const About = lazy(() => import("../views/About.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const Analysis = lazy(() => import("../views/Analysis.js"));
const Sensor = lazy(() => import("../views/Sensor.js"));
const Results = lazy(() => import("../views/Results.js"));

const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      //    { path: "/", element: <Navigate to="/login" /> },
      { path: "/", element: <Starter /> },
      { path: "/sensor", element: <Sensor /> },
      { path: "/Starter", exact: true, element: <Starter /> },
      { path: "/dataset", exact: true, element: <DataSet /> },
      { path: "/Analysis", exact: true, element: <Analysis /> },
      { path: "/results", exact: true, element: <Results /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
    ],
  },
];
export default ThemeRoutes;
