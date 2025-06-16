export interface SetCategoryFunctions {
    setBurgers: React.Dispatch<React.SetStateAction<boolean>>;
    setPizzas: React.Dispatch<React.SetStateAction<boolean>>;
    setFries: React.Dispatch<React.SetStateAction<boolean>>;
    setDrinks: React.Dispatch<React.SetStateAction<boolean>>;
    setDesserts: React.Dispatch<React.SetStateAction<boolean>>;
    setSalads: React.Dispatch<React.SetStateAction<boolean>>;
    setTacos: React.Dispatch<React.SetStateAction<boolean>>;
    setWings: React.Dispatch<React.SetStateAction<boolean>>;
    setPastas: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export const setCategory = (
    category: keyof SetCategoryFunctions,
    setters: SetCategoryFunctions
  ) => {
    Object.entries(setters).forEach(([key, setter]) => {
      setter(key === category);
    });
};