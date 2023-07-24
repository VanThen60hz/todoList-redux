import { createBrowserRouter } from "react-router-dom";
import Todos from "./components/Todos";

const router = createBrowserRouter([
  {
    path: "/todos",
    element: <Todos />,
  },
]);

export default router;
