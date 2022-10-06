export const formatPrice=(num:number)=>{
    return new Intl.NumberFormat('en-Us',{
      style:'currency',
      currency:'USD',
    }).format(num)
  }