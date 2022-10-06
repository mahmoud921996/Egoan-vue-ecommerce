import { defineStore } from 'pinia'
import { Product ,CartItem ,Amount} from '../types/index'


export const useCart = defineStore('cart',{
    state:()=>{
        return{
            cart:[] as CartItem[],
            total_items :0 as number,
            total_amount:0 as number
        }
    },
    getters:{
        cartItems():CartItem[]{
            return this.cart
        },
        totalAmount():number{
            const total= this.cart.reduce((acc , cartItem) => (
                acc + cartItem.amount
              ),0)
              this.total_amount = total;
              return this.total_amount

        },
        totalItems():number{
          const totalItems= this.cart.reduce((acc , cartItem) => (
            acc + (cartItem.amount * cartItem.price) 
          ),0)
          this.total_items =totalItems;
          return this.total_items
        },

    },
    actions:{
        addItem(payload:{id:string , product : Product , amount : number}){
          const tempItem= this.cart.find((item:CartItem) => item.id === payload.id)
          if(tempItem){
            const tempCart:CartItem[] = this.cart.map((cartItem : CartItem)=>{
                if(cartItem.id === payload.id){
                    let newAmount = cartItem.amount+ payload.amount;
                    return {...cartItem , amount : newAmount}
                }else{
                    return cartItem;
                }
            })
            this.cart = tempCart;
            
          }else{
            const newItem:CartItem={
                id:payload.id,
                title:payload.product.title,
                price:payload.product.price,
                description:payload.product.description,
                category : payload.product.category.name,
                image:payload.product.images[0],
                amount:payload.amount
            }
            this.cart.push(newItem)
        }
        },
        toggleAmount(payload : Amount){
            const {id , value } = payload
            const tempCart = this.cart.map((item)=>{
                if(item.id === id ){
                    if(value === 'inc'){
                        let newAmount = item.amount +1;
                        return {...item , amount : newAmount}
                    }
                    if(value === 'dec'){
                        let newAmount = item.amount -1;
                        if(newAmount < 1){
                            newAmount = 1
                        }
                        return {...item , amount : newAmount}
                    }
                }
                return item
            })
            this.cart = tempCart
            localStorage.setItem('cart' , JSON.stringify(this.cart))
           
        },
        removeItem(id:string){
            const tempCart = this.cart.filter((item) => item.id !== id);
            this.cart = tempCart;
    
        },
        clearCart(){
            this.cart=[];
        
        },
      
    },
    persist: true,
})