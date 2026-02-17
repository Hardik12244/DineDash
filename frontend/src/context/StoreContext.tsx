import { createContext, useEffect, useState, type ReactNode } from "react";
import { food_list, type FoodItemType } from "../assets/assets";

type StoreContextType = {
    food_list: FoodItemType[];
    cartItems: CartItemsType;
    setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    totalCartValue:()=>number
}

type StoreContextProviderProps = {
    children: ReactNode;
}

type CartItemsType = {
    [key: string]: number;
}

export const StoreContext = createContext<StoreContextType | null>(null);



const StoreContextProvider = ({ children }: StoreContextProviderProps) => {



    const [cartItems, setCartItems] = useState<CartItemsType>({});

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    const removeFromCart = (itemId: string) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const totalCartValue = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((e) => e._id === item)
                if (iteminfo) {
                    total += iteminfo.price * cartItems[item];
                }
            }
        }
        return total;
    }

    const contextValue: StoreContextType = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        totalCartValue,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;