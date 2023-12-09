import {useState,useContext,createContext, useEffect} from 'react'


const CartContext = createContext();

const CartProvider=({children})=>{
    const [cart,setCart]=useState([])
    useEffect(()=>{
    const data=localStorage.getItem("cart");
    if(data){
     const parsedata = JSON.parse(data)   
    setCart(parsedata);}
    },[])
    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
    }

const useCart =()=> useContext(CartContext)

export {
    useCart,
    CartProvider
}