import { Box, HStack, IconButton, Image, Text, } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { MdDelete } from "react-icons/md";
// import { MdEdit   } from   "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";

interface Product {
    _id:string,
    //id: string;
    image: string;
    name: string;
    price: number;
}


const ProductCard = ({ product }: { product: Product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {deleteProduct} = useProductStore();
    const handleDeleteProduct = async (pid: string) => {
        const {success,message} = await deleteProduct(pid);
        if(!success){
            toaster.error({
            title: "Error",
            description: message || "Failed to delete product",
            duration:2500,
            });
        }else{
            toaster.success({
                title:"Success",
                description:message,
                duration: 2500,  
            })
        }
    }
    // const handleUpdateProduct = async (pid:string) => {
    //     const {success,message} = await 
    // }
    return (
        <Box
        margin="6"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={4}
        bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={64}
                w="full"
                objectFit="cover"
            />
            <Box p={4}>
                <Text fontWeight="bold" fontSize="lg">
                {product.name}
                </Text>
                <Text fontSize="sm" color={textColor}>
                ${product.price}
                </Text>
            
                <HStack
                    justifyContent="space-between"
                    p={4}
                    borderTopWidth="1px"
                    borderColor="gray.200"
                >
                    <IconButton
                        aria-label="Edit"
                        variant="ghost">
                        {/* <MdEdit /> */}
                        {/* onClick={()=>handleUpdateProduct(product._id)}ç */}
                    </IconButton>
                    <IconButton        
                        aria-label="Delete"
                        variant="ghost">
                        <MdDelete onClick={()=>handleDeleteProduct(product._id)}/>
                    </IconButton>
                </HStack>
            </Box>
                <Toaster/>
        </Box>
    );
}
export default ProductCard