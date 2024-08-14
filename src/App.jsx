import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
// import Message from "./pages/message/Message";
import Signin from "./components/signin/signin";
import Signinuser from "./components/signin/Signinuser";
import ErrorBoundary from "./components/ErrorBoundary";
import MyGigs from "./pages/Mygigs/MyGigs";

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app">
      <Navbar />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      {isHomePage && <Footer />} {/* Render Footer only on the home page */}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        ),
      },
      {
        path: "/gigs",
        element: (
          <ErrorBoundary>
            <Gigs />
          </ErrorBoundary>
        ),
      },
      {
        path: "/MyGigs",
        element: (
          <ErrorBoundary>
            <MyGigs />
          </ErrorBoundary>
        ),
      },
      {
        path: "/My",
        element: (
          <ErrorBoundary>
            <Signin />
          </ErrorBoundary>
        ),
      },
      {
        path: "/signinuser",
        element: (
          <ErrorBoundary>
            <Signinuser />
          </ErrorBoundary>
        ),
      },
      {
        path: "/signin",
        element: (
          <ErrorBoundary>
            <Signin />
          </ErrorBoundary>
        ),
      },
      {
        path: "/orders",
        element: (
          <ErrorBoundary>
            <Orders />
          </ErrorBoundary>
        ),
      },
      {
        path: "/messages",
        element: (
          <ErrorBoundary>
            <Messages />
          </ErrorBoundary>
        ),
      },
      {
        path: "/add",
        element: (
          <ErrorBoundary>
            <Add />
          </ErrorBoundary>
        ),
      },
      {
        path: "/gig/:id",
        element: (
          <ErrorBoundary>
            <Gig />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
