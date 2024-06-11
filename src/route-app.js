import { GridComponent } from "./Components/grid";
import { Link, Route, Routes } from "react-router-dom";
import { UserDetails } from "./Components/user-details";

export function RouteApp(props) {
  return (
    <>
      <div>
        <h1>Our awesome app</h1>
        <Link to="/grid">Grid</Link>
        <br />
        <Link to="/details">Details</Link>
      </div>
      <Routes>
        <Route path="/grid" element={<GridComponent />} />
        <Route exact path="/details" element={<UserDetails />} />
      </Routes>
    </>
  );
}
