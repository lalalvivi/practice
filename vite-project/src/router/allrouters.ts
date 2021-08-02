import AllComponent from '../component'
import Canvas from '../component/Canvas'
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
                ],
            },
        ]
export default routes