// import { useState, useEffect } from "react";
import "./css/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import Activities from "./pages/Activities";
import Homepage from "./pages/Homepage";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import Employees from "./pages/Employees";
import Financials from "./pages/Financials";
import TroskoviTable from "./pages/TroskoviTable";
import RadniDnevnik from "./pages/RadniDnevnik";
import AddRadniDnevnikForm from "./components/AddRadniDnevnikForm";
import AddActivityPage from "./pages/AddActivityPage";
import AddProjectPage from "./pages/AddProjectPage";
import EditActivityPage from "./pages/EditActivityPage";

const App = () => <RouterProvider router={router} />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrapping all routes inside the Layout
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/financials",
        element: <Financials />,
      },
      {
        path: "/add-employee",
        element: <AddEmployeePage />,
      },
      {
        path: "/add-activity",
        element: <AddActivityPage />,
      },
      {
        path: "/add-project",
        element: <AddProjectPage />,
      },
      {
        path: "/edit-employee/:id",
        element: <EditEmployeePage />
      },
      {
        path: "/edit-activity/:id",
        element: <EditActivityPage />
      },
      {
        path: "/troskovi_mesecni",
        element: <TroskoviTable />,
      },
      {
        path: "/radni_dnevnik",
        element: <RadniDnevnik />,
      },
      {
        path: "/add-radni_dnevnik",
        element: <AddRadniDnevnikForm />,
      }
    ],
  },
]);

// function App() {
//   // const [employees, setEmployees] = useState([]);
//   // const [activities, setActivities] = useState([]);

//   return (
//     <RouterProvider>
//       <div className="app">
//         <Sidebar />
//         <main className="content">
//           <h1>Hello world</h1>

//           <Route path="/projects" component={Projects} />
//           {/* <Route path="/dashboard" component={Dashboard} />
//           <Route path="/employees" component={Employees} />
//           <Route path="/tasks" component={Tasks} />
//           <Route path="/reports" component={Reports} />
//           <Route path="/time-tracking" component={TimeTracking} /> */}
//         </main>
//         <div className="content">
//           <li>asdgkasg</li>
//           <li>asldgja;lskdgja</li>
//           <li>asdg;lgjasd</li>
//           <li>pojasgdka</li>
//           <li>xcmvjorivj</li>
//         </div>
//       </div>
//     </RouterProvider>
//   );
// }

export default App;
