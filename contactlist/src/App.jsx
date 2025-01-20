import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "*", element: <NotFound /> }, // Use '*' to catch all unmatched routes
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
