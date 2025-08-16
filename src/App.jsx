import Adlogin from "./adpages/adlogin"
import Admindash from "./adpages/Admindash"
import { Routes, Route } from 'react-router-dom'
import Products from "./adpages/products"
import Users from "./adpages/users"
import Useredit from "./userpages/edit"
import Category from "./adpages/categories"
import Addcat from "./adpages/addcat"
import Addprod from "./adpages/addprod"
import Editprod from "./adpages/editprod"
import Editcat from "./adpages/editcat"
import Orders from "./adpages/orders"
import ProtectedRoute from "./adpages/ProtectedRoute"
import Login from "./userpages/login"
import HomePage from "./userpages/HomePage"
import ProductDetails from "./userpages/ProductDetails"
import CategoryPage from "./userpages/CategoryPage"
import Cart from "./userpages/Cart"


function App() {

  return (

    <>

      <Routes>
        <Route path="/admin" element={<Adlogin />} />
        <Route path="/admindash" element={<ProtectedRoute><Admindash /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path='/edituser' element={<ProtectedRoute><Useredit /></ProtectedRoute>} />
        <Route path='/categories/addcat' element={<ProtectedRoute><Addcat /></ProtectedRoute>} />
        <Route path='/products/addprod' element={<ProtectedRoute><Addprod /></ProtectedRoute>} />
        <Route path="/editprod/:id" element={<ProtectedRoute><Editprod /></ProtectedRoute>} />
        <Route path="/editcat/:id" element={<ProtectedRoute><Editcat /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/uselogin" element={<Login/>}/>
        <Route path="/home"element={<HomePage/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path="/user/categories" element={<CategoryPage />} />
         <Route path="/categories/:id" element={<CategoryPage />} />
         <Route path='user/categories/687dc5fdd65009b81e993377' element={<CategoryPage/>}/>
         <Route path="/cart" element={<Cart/>}/>



      </Routes>




    </>

  )
}

export default App
