import {Login} from "./components/login/Login";
import {Route, Routes} from "react-router-dom";
import './App.css'
import {Home} from "./components/home/Home";
import {ProtectedLayout} from "./layout/ProtectedLayout";
import {Map} from "./components/map/Map";
import {AuthLayout} from "./layout/AuthLayout";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedLayout />} >
          <Route path="profile" element={<Home />} />
          <Route path="map" element={<Map />} />
        </Route>
        <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
