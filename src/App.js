import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/website/Auth/signup';

import Login from './pages/website/Auth/login';
import Dashboard from './pages/dashboard/dashboad';
import Home from './pages/website/Home';
import Users from './pages/dashboard/User';
import UpdateUser from './pages/dashboard/updateUser';
import CreateUser from './pages/dashboard/createUser';
import RequireAuth from './pages/website/Auth/requireAuth';
import PresistLogin from './pages/website/Auth/presisitLogin';
import Product from './pages/dashboard/products/product';
import NewProducts from './pages/dashboard/products/newProducts';
import UpdateProduct from './pages/dashboard/products/updateProduct';


export default function App() {


    return <div className='app'>
        
        <Routes>
            {/* public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            {/* Protected routes */}
            <Route element={<PresistLogin />}>
            <Route element={<RequireAuth />}>
            <Route path='/dashboard' element={<Dashboard />} >
                <Route path='users' element={<Users />} />
                <Route path='user/create' element={<CreateUser />} />
                <Route path='users/:id' element={<UpdateUser />} />
                <Route path='products' element={<Product />} />
                <Route path='product/create' element={<NewProducts />} />
                <Route path='products/:id' element={<UpdateProduct />} />
            </Route>
            </Route>
            </Route>
        </Routes>

    </div>
}