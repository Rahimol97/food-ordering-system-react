import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar'
import { food_list } from './assets/images/assets'

function App() { 
  const [count, setCount] = useState({});
  return (
    <div >
      <Navbar count={count} />
        <main>
        <Outlet context={{ count, setCount, fooditems: food_list }} />
      </main>

    </div>
  )
}

export default App