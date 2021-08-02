import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routes  from './allrouters'

const Router = () => (
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
   //这个方法，每次有子路由时都需要使用，会传当前路由的子路由，可以说是按需加载，
       //实时编译的，而不是一次性吧所有路由都渲染出来
)
export default Router
