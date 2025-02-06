import { create } from "zustand";

interface Product {
    _id:string,
    id: string;
    name: string;
    price: number;
    image: string;
}

interface ProductState {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: Product) => Promise<{ success: boolean; message: string }>;
    fetchProducts: () => Promise<void>; // Add fetchProducts to the interface
    deleteProduct: (pid: string) => Promise<{ success: boolean; message: string }>;
    // updateProduct:(pid:string)=> Promise<{success:boolean;message:string}>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [] as Product[],
    setProducts: (products: Product[]) => set({ products }),
    createProduct: async (newProduct: Product) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "All fields are required" };
        }
        const res = await fetch("/api/products", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (pid: string) => {
        const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
        const data = await res.json();
        if (!data.success) return  {success:false,message:data.message};
        //updates the ui immiditely,without needing a refresh
        set(state=> ({products:state.products.filter(product=>product._id !== pid)}));
        return{success:true,message:data.message};
    },
    // updateProduct: async(pid:string) =>{
    //     const res = await fetch(`/api/products/${pid}`,{method:"PUT"});
    //     const data = await res.json()
    //     if(!data.success) return {success:false,message:data.message};
    //     set(state=>({products:state.products.filter(product=>product._id !== pid)}));
    //     return {success:true,message:data.message}
    // }
}));
