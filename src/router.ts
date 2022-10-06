import {createRouter , createWebHistory , RouteLocationNormalized} from 'vue-router'
import HomePage from './views/HomePage.vue';
import {useAuth} from './store/Auth';


const Cart = ()=> import('./views/Cart.vue')
const Auth = ()=> import('./views/UserAuth.vue')
const Product = ()=> import('./views/Product.vue');
const NotFound =()=> import ('./views/NotFound.vue') 

const router =createRouter({
    routes:[
        {
            path:'/',
            component:HomePage
        },
     
        {
            path:"/product/:id",
            component:Product,
            props:true
        },{
            path:'/cart' , 
            component:Cart
        },{
            path:'/auth',
            component:Auth,
            meta:{
                requireUnAuth:true
            }
        
        },{
            path:'/:notFound(.*)',
            component:NotFound
        }
    ],
    history:createWebHistory(),

})

router.beforeEach(( to:RouteLocationNormalized  , _ , next:Function)=>{
    const authStore = useAuth();
    if(to.meta.requireUnAuth && authStore.isAuthenticated){
        next('/')
    }else{
        next()
    }
})

export default router


