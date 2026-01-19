import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Forma from "./components/pages/Forma" // ✅ QO‘SHILADI

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Forma" element={<Forma />} /> {/* ✅ SHU YER */}
      </Routes>
    </>
  )
}

export default App
