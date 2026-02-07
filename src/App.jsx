import "./App.css";
import AddNumber from "./components/AddNumber.jsx";
import AddMember from "./components/AddMember.jsx";
import {Layout} from "./Layouts/Layout.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const rout = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
             {
          path: "Raqam_Qoshish",
          element: <AddNumber />
        },
        {
          path: "Odam_Qoshish",
          element: <AddMember />,
        },

      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={rout} />
    </div>
  );
}

export default App;
