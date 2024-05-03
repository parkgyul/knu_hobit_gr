import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Login = lazy(() => import("../pages/LoginPage.js"));
const DataSet = lazy(() => import("../pages/DataSet.js"));
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

/*****Routes******/
/*
// 인증된 사용자인지 확인하는 함수
const isAuthenticated = () => {
  const token = localStorage.getItem("Accesstoken");
  console.log("Accesstoken 파싱 성공 " + token);
  return token ? true : false;
};

// 페이지에 대한 라우트를 보호하는 컴포넌트
const RouteGuard = ({ component }) => {
  //isAuthenticated() ? component : <LoginRequiredPage />;
  return component;
};

const LoginRequiredPage = () => {
  return (
    <div>
      <h3>로그인이 필요한 서비스입니다.</h3>
      <Login />
    </div>
  );
};

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <RouteGuard component={<Starter />} /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/join", exact: true, element: <Join /> },
      {
        path: "/starter",
        exact: true,
        element: <RouteGuard component={<Starter />} />,
      },

      {
        path: "/analysis",
        exact: true,
        element: <RouteGuard component={<Analysis />} />,
      },
      {
        path: "/sensor",
        exact: true,
        element: <RouteGuard component={<Sensor />} />,
      },
      {
        path: "/about",
        exact: true,
        element: <RouteGuard component={<About />} />,
      },
      {
        path: "/alerts",
        exact: true,
        element: <RouteGuard component={<Alerts />} />,
      },
      {
        path: "/badges",
        exact: true,
        element: <RouteGuard component={<Badges />} />,
      },
      {
        path: "/buttons",
        exact: true,
        element: <RouteGuard component={<Buttons />} />,
      },
      {
        path: "/cards",
        exact: true,
        element: <RouteGuard component={<Cards />} />,
      },
      {
        path: "/grid",
        exact: true,
        element: <RouteGuard component={<Grid />} />,
      },
      {
        path: "/table",
        exact: true,
        element: <RouteGuard component={<Tables />} />,
      },
      {
        path: "/forms",
        exact: true,
        element: <RouteGuard component={<Forms />} />,
      },
      {
        path: "/breadcrumbs",
        exact: true,
        element: <RouteGuard component={<Breadcrumbs />} />,
      },
    ],
  },
];
*/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
//    { path: "/", element: <Navigate to="/login" /> },
      { path: "/", element: <Starter/> },
      { path: "/sensor", element: <Sensor />},
      { path: "/Starter", exact: true, element: <Starter/> },
      { path: "/DataSet", exact: true, element: <DataSet/> },
      { path: "/Analysis", exact: true, element: <Analysis/> },
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
    ],
  },
];
export default ThemeRoutes;
