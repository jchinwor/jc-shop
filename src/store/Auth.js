import { defineStore } from "pinia";
import {  onMounted, ref } from "vue";
import axios from "axios";
import setAuthHeader from "@/utils/setAuthHeader";
import router from "@/router";
// import router from "@/router";

export const useAuthStore = defineStore('Auth', ()=>{

    const token = ref(''); 
    const usermain = ref({})
    const orderCartItem = ref({})
    const status = ref('')
    const error = ref(null)
    const firstname = ref('')
    const lastname = ref('')
    const userid = ref('')
    const email = ref('')
    const regdate = ref('')
    const customerOrders = ref({})
    const customerPaidOrders = ref({})
      const serverApi = ref(null)
    serverApi.value = process.env.VUE_APP_SERVICE_URL

   
    
 

    const NotLoggedIn  = () =>{
    

            if(token.value !=''){
                return false
            }else{
                return true
            }
           
   
   }
    const isLoggedIn = () =>{
    
            if(token.value !=''){
                return true
            }else{
                return false
            }
           
   
   }


const updateUser = (updated_user) =>{

    usermain.value = updated_user
}


const updateUserCartItems = async (CartItemsInLoc,userid) =>{

    if(userid){

            try {
    
              const result = await axios.post(`${serverApi.value}/api/users/${userid}/cartItems`,{
                cartitemsvalue: CartItemsInLoc
              });
              const CartItemsdata = result.data

            

            if(!CartItemsdata){
              throw Error('No data available')
            }
    
            
          }catch (err) {
          //   error.value = err.message
          
          }  
    }

} 
   
const authUser = async(email,password) =>{
      

   
            let result = await axios.post(`${serverApi.value}/api/users/login`,{
                email:email,
                password:password
            })
            
            if(result.data.success){

                const token1 = result.data.token;
                const user1 = result.data.user;

                usermain.value = user1
                token.value = token1

                firstname.value = usermain.value.firstname

                

                localStorage.setItem('jwtToken',token.value);
                setAuthHeader(token.value)


            }

            return result;

            
    
       
   
   }
    const UserRegister = async(userData) =>{


        try{

            let result = await axios.post(`${serverApi.value}/api/users/register`,userData);
            
            if(result.data.success !== undefined){

                
                    status.value = "success"

            }
            return result;


        }catch(err){

            error.value = err.response.data.msg
        }
        
   
   }

   const LogOut = (CartItems)=>{

         localStorage.removeItem('jwtToken',token.value)
         localStorage.removeItem('Auth',token.value)
         

        //   localStorage.clear();

         token.value = ''
         firstname.value = ''
         lastname.value = ''
         email.value = ''
         userid.value =''
         usermain.value = ''
         
         CartItems.value = []

        router.push({

            name: "LoginPage",
           
        })
        
        return

   }

   const GetProfile = async() =>{

     try{


      const config = {
        headers: {
          Authorization: `${token.value}`,
          }
        
      }

        let res = await axios.get(`${serverApi.value}/api/users/profile`,config)

        if(res){

            userid.value = res.data.user._id
            firstname.value = res.data.user.firstname
            lastname.value = res.data.user.lastname
            email.value = res.data.user.email
            regdate.value = res.data.user.createdAt
        }

       
 
        return res

     }catch(err){

     }

   }

   const getAllCustomerOrders = async() =>{

    const config = {
      headers: {
        Authorization: `${token.value}`,
        }
    
    }

      try{

          const result = await axios.get(`${serverApi.value}/api/orders/`,config);
    
          // const orderData = result.data

          if(result.data){

            customerOrders.value = result.data

            // Customer_shippingAddress.value = result.data.order.shippingAddress
          }


      }catch(err){

        if(err){

          router.push({

            name: "NotFoundPage"

          })
        }


      }

        

  }
 
const getAllPaidCustomerOrders = async() =>{

    const config = {
      headers: {
        Authorization: `${token.value}`,
        }
    
    }

      try{

          const result = await axios.get(`${serverApi.value}/api/orders/paidorders`,config);
    
          // const orderData = result.data

          if(result.data){

            customerPaidOrders.value = result.data

            // Customer_shippingAddress.value = result.data.order.shippingAddress
          }


      }catch(err){

        if(err){

          router.push({

            name: "NotFoundPage"

          })
        }


      }

        

  }

const getCustomerOrderCartItem = async (productid) =>{

    const config = {
        headers: {
          Authorization: `${token.value}`,
          }
      
      }
  
        try{
  
            const result = await axios.get(`${serverApi.value}/api/orders/getCartItem/`+productid,config);
      
            // const orderData = result.data
  
            if(result.data){
  
                orderCartItem.value = result.data.getOrderCartItem
  
              // Customer_shippingAddress.value = result.data.order.shippingAddress
            }
  
  
        }catch(err){
  
          if(err){
  
            router.push({
  
              name: "NotFoundPage"
  
            })
          }
  
  
        }
  

}
  

const createProductReview = async (productid,ratingData) =>{

  const config = {
    headers: {
      Authorization: `${token.value}`,
      }
  
  }

    try{

        const result = await axios.post(`${serverApi.value}/api/products/${productid}/review`,ratingData,config);
  
        // const orderData = result.data

        // if(result.data){

        //     orderCartItem.value = result.data.getOrderCartItem

        //   // Customer_shippingAddress.value = result.data.order.shippingAddress
        // }

        return result


    }catch(err){

      if(err){

        router.push({

          name: "NotFoundPage"

        })
      }


    }

}
  

const UpdateUserProfile = async(updatedata) =>{

      try{

        const config = {
          headers: {
            Authorization: `${token.value}`,
            }
        
        }

          let result = await axios.put(`${serverApi.value}/api/users/profile`,updatedata,config)

          if(result){
              

              firstname.value = result.data.updatedUser.firstname
              lastname.value = result.data.updatedUser.lastname
              
          }

        

          return result

      }catch(err){

      }
   

   }

   const UpdateUserPassword = async(updatedata) =>{

    try{

        const config = {
            headers: {
              Authorization: `${token.value}`,
              }
          
          }
    
            let result = await axios.put(`${serverApi.value}/api/users/updatepassword`,updatedata,config)
    
            if(result){
    
                firstname.value = result.data.firstname
                
            }
    
           
     
            return result


    }catch(err){

        error.value = err.response.data.msg
    }

  

   }
   


    onMounted( ()=> {

        isLoggedIn()
        
        // GetProfile()
        // authUser() 
       
       

    });   

 

  return {
        userid,
        firstname,
        lastname,
        email,
        regdate,
        GetProfile,
        isLoggedIn,
        authUser,
        token,
        usermain,
        error,
        NotLoggedIn,
        UserRegister,
        status,
        LogOut,
        UpdateUserProfile,
        UpdateUserPassword,
        updateUserCartItems,
        updateUser,
        getAllCustomerOrders,
        customerOrders,
        getAllPaidCustomerOrders,
        customerPaidOrders,
        getCustomerOrderCartItem,
        orderCartItem,
        createProductReview
        
    }

})
