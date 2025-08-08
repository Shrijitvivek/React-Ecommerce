import Adlogin from "./adpages/adlogin"
import Admindash from "./adpages/Admindash"
import {  Routes , Route} from 'react-router-dom'
import Products from "./adpages/products"
import Users from "./adpages/users"


function App() {

  return (

    <>
    
<Routes>
 <Route path="/admindash" element={<Admindash/>}/>
 <Route path="/" element={<Adlogin/>}/>
 <Route path="/products" element={<Products/>}/>
 <Route path="/users" element={<Users/>}/>
</Routes>
     

    
 
    </>
 
  )
}

export default App
