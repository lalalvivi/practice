import AllComponent from '../component'
import Canvas from '../component/Canvas'
import fabric from '../component/fabric/fabric'
import filter from '../component/fabric/filter'
import Webgl from '../component/webgl'



const routes = [ {
        path: '/',
        component: AllComponent,//当组件下有子组件的时候要特别注意
        routes: [
             {
                path: '/canvas',
                component: Canvas,
                routes: [],
            },
             {
                path: '/webgl',
                component: Webgl,
                routes: [],
            },
             {
                path: '/fabricCase',
                component: fabric,
                routes: [],
                exact: true
            },
             {
                path: '/filter',
                component: filter,
                routes: [],
            },
                ],
            },
        ]
export default routes