import { createContext } from "react";
import { products } from '../assets/assets'

// we usaully creates these context file to use these values in anywhere
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹'
    const delivery_fee = 40

    const value = {
        currency,
        delivery_fee,
        products,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;