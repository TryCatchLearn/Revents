import Navbar from "./nav/Navbar"
import AnimatedOutlet from "../router/AnimatedOutlet";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-10 mt-24">
        <AnimatedOutlet />
      </div>
    </div>
  )
}

export default App
