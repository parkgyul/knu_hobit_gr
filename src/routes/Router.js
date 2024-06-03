import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const DataSet = lazy(() => import("../views/DataSet.js"));

const Starter = lazy(() => import("../views/Starter.js"));
const Analysis = lazy(() => import("../views/Analysis.js"));
const Sensor = lazy(() => import("../views/Sensor.js"));
const Results = lazy(() => import("../views/Results.js"));
const ResultChartPage = lazy(() => import("../views/ResultChartPage.js"));
const ResultML = lazy(() => import("../views/ResultML.js"));

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
      { path: "/result", exact: true, element: <ResultChartPage /> },
      { path: "/result-ml", exact: true, element: <ResultML /> },
    ],
  },
];
export default ThemeRoutes;
