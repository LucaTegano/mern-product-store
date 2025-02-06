import { useState, ChangeEvent } from "react";
import { useProductStore } from "../store/product";
import { Container, VStack, Heading, Box, Input, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster"

interface ProductForm {
  name: string;
  price: string;  // Store as string for input handling
  image: string;
}

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState<ProductForm>({
    name: "",
    price: "",
    image: "",
  });
  
  const { createProduct } = useProductStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async () => {
    // Convert price to number at submission time
    const price = parseFloat(newProduct.price);

    const productData = {
       // or generate a unique id if necessary
      name: newProduct.name,
      price,
      image: newProduct.image
    };

    const { success, message } = await createProduct(productData);
    
    if (success) {
      console.log("Product created successfully",productData);
      toaster.success({ 
        title: "Success",
        description: "Product created successfully",
        duration:2500,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toaster.error({
        title: "Error",
        description: message || "Failed to create product",
        duration:2500,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          borderRadius="lg"
          shadow="lg"
        >
          <VStack>
            <Input
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
            <Input
              name="price"
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleInputChange}
            />
            <Input
              name="image"
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddProduct}>Add Product</Button>
            <Toaster/>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;