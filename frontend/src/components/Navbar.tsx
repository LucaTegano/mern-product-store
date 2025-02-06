// import React from 'react'
import {Button, Container,Flex,HStack,Text,} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base:"column",sm:"row"}}>

      <Text fontSize={{base:"l",sm:"xl"}} fontWeight={"bold"}bgGradient='linear(to-r, green.200, pink.500)' textAlign={"center"}textTransform={"uppercase"}>

        <Link to={"/"}>Product Store 🛒</Link>

      </Text>

      <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button><IoMdAdd/></Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon/> : <LuSun/>}
          </Button>
      </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar