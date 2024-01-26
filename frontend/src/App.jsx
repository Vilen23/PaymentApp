import { Route, Routes, useLocation } from "react-router-dom"
import { Signup } from "./Components/Signup"
import { Dashboard } from "./Components/Dashboard/Dashboard"
import { Signin } from "./Components/Signin"
import { Homepage } from "./Components/Homepage/Homepage"
import { Homenav } from "./Components/Homepage/Homenav"

function App() {
  const location = useLocation();

  return (
    <div className="bg-gray-100 min-h-screen">
      {location.pathname!=="/Dashboard" && <Homenav/>}
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App
