import { createRouter, createWebHistory  } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import Cart from '../views/CartPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CheckoutPaymentPage from '../views/CheckoutPaymentPage.vue'
import Profile from '../views/ProfilePage.vue'
import CheckoutAddress from '../components/CheckoutAddress.vue'
import EditProfile from '../views/EditProfilePage.vue'
import CheckoutDetail from '../views/CheckOutPage.vue'
import userOrder from '../views/UserOrdersPage.vue'
import ReviewRatings from '../views/ReviewRatingsPage.vue'
import RateProduct from '../views/RateProductPage.vue'
import Shop from '../views/ShopPage.vue'
import SearchShop from '../views/SearchShopPage.vue'
import categoryCatalog from '../views/categoryCatalogPage.vue'
import { useAuthStore } from "../store/Auth"





const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta:{
      title:'Home',     
      },
  },
  {
    path: '/checkout/summary',
    name: 'CheckoutDetail',
    component: CheckoutDetail,
    meta:{
      title:'Check Out',  
      requiresAuth:true,   
      },
  },
  {
    path: '/checkout/address',
    name: 'CheckoutAddress',
    component: CheckoutAddress,
    meta:{
      title:'Checkout Address',
      requiresAuth:true,     
      },
  },
  {
    path: '/order/:id/payment',
    name: 'OrderPayment',
    component: CheckoutPaymentPage,
    meta:{
      title:'Checkout Payment',
      requiresAuth:true,     
      },
  },
  {
    path: '/products/cart',
    name: 'Cart',
    component: Cart,
    meta:{
      title:'Cart',     
      },
  },
  {
    path: '/edit/:firstname/profile',
    name: 'EditProfile',
    component: EditProfile,
    meta:{
      title:'Edit Profile',
      requiresAuth:true,
      },
  },
  {
    path: '/shop/:keyword',
    name: 'SearchShop',
    component: SearchShop,
    meta:{
      title:'Search Shop ',
      },
  },
  {
    path: '/category/:catTitle',
    name: 'categoryCatalog',
    component: categoryCatalog,
    meta:{
      title:'Catagory Shop ', 
      },
  },
  {
    path: '/shop/',
    name: 'Shop',
    component: Shop,
    meta:{
      title:'Shop',
      },
  },
  {
    path: '/user/reviewratings/',
    name: 'ReviewRatings',
    component: ReviewRatings,
    meta:{
      title:'Review Ratings',
      requiresAuth:true,
      },
  },
  {
    path: '/user/reviewratings/detail/:id',
    name: 'RateProduct',
    component: RateProduct,
    meta:{
      title:'Rate Product',
      requiresAuth:true,
      },
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'Profile',
      requiresAuth:true,   
      },
   
  },
  {
    path: '/user/orders/',
    name: 'userOrder',
    component: userOrder,
    meta:{
      title:'User Orders',
      requiresAuth:true,   
      },
   
  },
  {
    path: '/user/login',
    name: 'LoginPage',
    component: LoginPage,
    meta:{
      title:'Login',
      requiresGuest:true,
      
    }
  },
  {
    path: '/user/register/account',
    name: 'RegisterPage',
    component: RegisterPage,
    meta:{
      title:'Registration',
      requiresGuest:true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetailPage.vue'),
    meta:{
      title:'Product Detail',
      
      
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  }
})

router.beforeEach(async (to, from, next) =>{

  document.title = `${to.meta.title} :: JSTORE` ; 

  const store = useAuthStore();
  const { isLoggedIn } = store

  if(to.matched.some(record => record.meta.requiresAuth)){

    

     if(!isLoggedIn()){ 

       //Redirect to the login page

      
      //Check for redirect and redirect users to initial page after login
       next({
            path: "/user/login",
            query: { redirect: to.fullPath }
        });

       
     }else{
        next()
     }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if(isLoggedIn()){
      //Redirect to the login page

      next('/user/profile')

    }else{
       next()
    }
  }else{ 
     next()
  }

})

export default router
