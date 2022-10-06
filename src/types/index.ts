export  type Catg={
    id:string,
    name:string,
    image:string
}


export interface Product{
    id:string,
    title: string,
    price: number,
    description: string,
    category: {
      id: number,
      name: string,
      image: string
    },
    images: string[]
}


export interface Filter{
  clothes: boolean,
  electronics: boolean,
  furniture: boolean,
  shoes: boolean,
  others: boolean,
}


export interface Price{
  minPrice: number,
  maxPrice: number,
}

export interface CartItem{
  id:string,
  title:string,
  price:number,
  description:string,
  category : string,
  image:string,
  amount:number
}


export interface Amount{
  value:string , 
  id:string
}



export interface Auth{
  email:string,
  password:string
}


export interface Authentication extends Auth{
mode:'signup'|'login'
}
