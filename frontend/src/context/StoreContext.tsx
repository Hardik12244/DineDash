import { createContext, type ReactNode } from "react";
import { food_list, type FoodItemType } from "../assets/assets";

type StoreContextType = {
    food_list: FoodItemType[];
}

export const StoreContext = createContext<StoreContextType | null>(null);

type StoreContextProviderProps = {
    children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {

    const contextValue: StoreContextType = {
        food_list
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;