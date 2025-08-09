import Adlogin from "./adpages/adlogin"
import Admindash from "./adpages/Admindash"
import {  Routes , Route} from 'react-router-dom'
import Products from "./adpages/products"
import Users from "./adpages/users"
import Useredit from "./userpages/edit"
import Category from "./adpages/categories"
import Addcat from "./adpages/addcat"
import Addprod from "./adpages/addprod"
import Editprod from "./adpages/editprod"


function App() {

  return (

    <>
    
<Routes>
 <Route path="/admindash" element={<Admindash/>}/>
 <Route path="/" element={<Adlogin/>}/>
 <Route path="/products" element={<Products/>}/>
 <Route path="/users" element={<Users/>}/>
 <Route path="/categories" element={<Category/>}/>
 <Route path ='/edituser' element={<Useredit/>}/>
 <Route path ='/categories/addcat' element={<Addcat/>}/>
  <Route path ='/products/addprod' element={<Addprod/>}/>
  <Route path="/editprod/:id" element={<Editprod />} />


</Routes>
     

    
 
    </>
 
  )
}

export default App
