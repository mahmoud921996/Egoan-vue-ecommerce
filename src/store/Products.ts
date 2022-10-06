import { defineStore } from 'pinia'
import { Product , Catg  ,Filter, Price } from '../types/index'


export const useProducts = defineStore('products', {
    // other options...
    state:()=>{
        return {
            categories:[] as Catg[],
            show:true as boolean,
            products:<Product[]>[],
            filteredProducts:<Product[]>[],
             category:<Filter>{
                        clothes: true,
                        electronics: true,
                        furniture: true,
                        shoes: true,
                        others: true,
                },
                price:<Price>{
                    maxPrice:10000,
                    minPrice:0
                }
            
        }
    },
    getters:{
        allCategories() : Catg[]{
            return this.categories
        },
        showFilter():boolean{
            return this.show
        },
        getProducts():Product[]{
            return this.products
        },
        getFilteredProducts():Product[]{
            return this.filteredProducts
        },
        getPrice():Price{
            return this.price
        }

       
    },
    actions:{
        async loadCategories(){
            const res = await fetch('https://api.escuelajs.co/api/v1/categories?limit=5');
           const data = await res.json();
           this.categories=data;
        },
        toggleFilter(){
            this.show = !this.show
        },
       async loadProducts(limit:number =30  , offset:number =0){
            const res = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`);
            const data = await res.json();
            this.products=data;
            this.filteredProducts=data;
            const maxPrice = data.map((item:Product) => item.price)
            this.price ={...this.price , maxPrice:Math.max(...maxPrice)}
        },
   
        updateFilter(payload:{name:string , value:boolean }){
        
                this.category={...this.category, [payload.name]:payload.value}
        },
        updatePrice(payload:{minPrice:number , maxPrice:number}){
          this.price = {minPrice : payload.minPrice , maxPrice:payload.maxPrice}  
        },
        filterItems(){
            const tempProducts = this.products.filter((prod:Product) =>{
                if(this.category.clothes && prod.category.name.includes('Clothes') && prod.price >= this.price.minPrice && prod.price <= this.price.maxPrice){
                    return true
                }
                if(this.category.electronics && prod.category.name.includes('Electronics') && prod.price >= this.price.minPrice && prod.price <= this.price.maxPrice){
                    return true
                }
                if(this.category.furniture && prod.category.name.includes('Furniture') && prod.price >= this.price.minPrice && prod.price <= this.price.maxPrice){
                    return true
                }
                if(this.category.shoes && prod.category.name.includes('Shoes') && prod.price >= this.price.minPrice && prod.price <= this.price.maxPrice){
                    return true
                }
                if(this.category.others && prod.category.name.includes('Others') && prod.price >= this.price.minPrice && prod.price <= this.price.maxPrice){
                    return true
                }
                return false
            })
                  this.filteredProducts=tempProducts;
        },

    }

  })