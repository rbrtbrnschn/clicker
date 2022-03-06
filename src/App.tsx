import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AppV1 } from "./v1/App.v1"
import { AppV2 } from "./v2/App.v2"

export const App = () => {
  return <div className="App">
    <Router>
      <Routes>
        <Route index element={<AppV1/>} />
        <Route path="v2" element={<AppV2/>} />
      </Routes>
    </Router>
  </div>
}
