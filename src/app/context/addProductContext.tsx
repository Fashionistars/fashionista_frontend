"use client";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { NewProductType } from "@/types";
import { FormSchema } from "../utils/schema";
import { NewProductFieldTypes } from "../utils/schemas/addProduct";

const initialValue: NewProductType = {
  image_1: undefined as unknown as File,
  title: "",
  description: "",
  sales_price: "",
  regular_price: "",
  shipping_amount: "1000",
  stock_qty: "",
  tag: "",
  total_price: "2000",
  category: "",
  brands: "",
  image_2: undefined as unknown as File,
  image_3: undefined as unknown as File,
  image_4: undefined as unknown as File,
  video: undefined as unknown as File,
  specification: {
    title: "",
    content: "",
  },
  sizes: {
    size: "",
    price: "",
  },
};
type NewProductValueTypes = {
  newProductFields: NewProductType;
  updateNewProductField: (fields: Partial<NewProductFieldTypes>) => void;
  // dataLoaded: boolean;
  resetNewProductField: () => void;
};
export const NewProductContext = createContext<NewProductValueTypes | null>(
  null
);
const LOCAL_STORAGE_KEY = "new_product_fields";
const NewProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dataFromStorage =
    typeof window !== "undefined" && localStorage.getItem(LOCAL_STORAGE_KEY);
  const data = dataFromStorage ? JSON.parse(dataFromStorage) : initialValue;
  const [newProductFields, setNewProductFields] =
    useState<NewProductType>(data);

  // const [dataLoaded, setDataLoaded] = useState(false);

  const saveDataToLocalStorage = (currentDealData: NewProductType) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentDealData));
  };

  const readStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data;
    // console.log(data);
  };
  // const readFromLocalStorage = () => {
  //   const loadedDataString = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   console.log("Loaded data", loadedDataString);
  //   if (!loadedDataString) return setNewProductFields(initialValue);

  //   const validated = FormSchema.safeParse(JSON.parse(loadedDataString));
  //   console.log("Validated data", validated);
  //   if (validated.success) {
  //     setNewProductFields(validated.data);
  //   } else {
  //     setNewProductFields((prev) => ({ ...prev, new_value: true }));
  //   }
  // };
  const updateNewProductField = useCallback(
    (dealDetails: Partial<NewProductFieldTypes>) => {
      setNewProductFields({ ...newProductFields, ...dealDetails });
    },
    [newProductFields]
  );
  // useEffect(() => {
  //   const data = readStorage();
  //   console.log(data);
  // }, []);
  const resetLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setNewProductFields(initialValue);
  };
  // useEffect(() => {
  //   const data = readFromLocalStorage();
  //   // // setDataLoaded(true);
  //   console.log("read data", data);
  //   // setNewProductFields(data)
  // }, [newProductFields]);

  // useEffect(() => {
  //   const data = readStorage();
  //   const newData = data ? JSON.parse(data) : newProductFields;
  //   console.log("New Data", newData);
  //   saveDataToLocalStorage(newData);
  // }, [newProductFields]);

  useEffect(() => {
    saveDataToLocalStorage(newProductFields);
  }, [newProductFields]);

  const contextValue = useMemo(
    () => ({
      newProductFields,
      updateNewProductField,

      resetLocalStorage,
    }),
    [newProductFields, updateNewProductField]
  );

  return (
    <NewProductContext.Provider value={contextValue}>
      {children}
    </NewProductContext.Provider>
  );
};
export default NewProductContextProvider;

export function useAddProductContext() {
  const context = useContext(NewProductContext);
  if (context === null) {
    throw new Error(
      "useAddDealContext must be used within a AddDealContextProvider"
    );
  }
  return context;
}
