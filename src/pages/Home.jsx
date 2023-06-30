// import notAppLogo from ".././assets/logonotapp.png";
// import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
// import { useNavigate, Link } from "react-router-dom";
// import ".././styles/index.css";
// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Stack,
//   HStack,
//   Button,
//   Heading,
//   useColorModeValue,
//   useToast,
//   Text,
// } from "@chakra-ui/react";
// import { useUser, useAuth } from "reactfire";
// import { AuthContext, auth } from "../AuthContext";

// import { useState, useContext } from "react";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
// } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";

// const Home = () => {
//   const auth = getAuth();
//   const [user, setUser] = useState({});

//   onAuthStateChanged(auth, (currentUser) => {
//     setUser(currentUser);
//   });

//   const {
//     handleSubmit,
//     control,
//     register,
//     trigger,
//     formState: { errors, isSubmitting },
//   } = useForm();
//   const toast = useToast();
//   const navigate = useNavigate();
//   const submitHandler = async () => {
//     try {
//       const result = await signInWithEmailAndPassword(
//         auth,
//         document.querySelector(".email").value,
//         document.querySelector(".contrasena").value
//       );
//       if (result.user) {
//         navigate("/profesor");

//         toast({
//           title: "Sesión iniciada",
//           description: "Inició sesión correctamente",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } else {
//         alert("NotApp: No se pudo iniciar sesión");
//       }
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: "Error",
//         description: "Usuario y/o contraseña erroneos",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const currentUser = useContext(AuthContext);

//   if (currentUser) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="home">
//       <span>
//         <Text color={"black"}>
//           Para una esperiencia de comunicación mejorada
//         </Text>
//       </span>

//       <HStack spacing={"30vmax"} mx={"1vmax"} maxW={"lg"} py={12} px={6}>
//         <img src="./nino-libro.png" alt="Niño con libro" />
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("lightGreen", "gray.700")}
//           boxShadow={"lg"}
//           p={8}
//         >
//           <Stack spacing={4}>
//             <FormControl id="email">
//               <FormLabel>Correo electrónico</FormLabel>
//               <Input bg={"white"} type="email" className="email" />
//             </FormControl>
//             <FormControl id="contrasena">
//               <FormLabel>Contraseña</FormLabel>
//               <Input bg={"white"} type="password" className="contrasena" />
//             </FormControl>
//             <Stack spacing={10}>
//               <Stack
//                 direction={{ base: "column", sm: "row" }}
//                 align={"start"}
//                 justify={"space-between"}
//               >
//                 <Checkbox>Recordarme</Checkbox>
//                 <Link color={"blue.400"}>Olvidaste tu contraseña?</Link>
//               </Stack>
//               <Button
//                 onClick={() => submitHandler()}
//                 bg={"#59D2FE"}
//                 color={"white"}
//                 isLoading={isSubmitting}
//                 _hover={{
//                   bg: "secondary",
//                 }}
//               >
//                 Entrar
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </HStack>
//     </div>
//   );
// };

// export default Home;
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Homenavbar from "../components/HomeNavbar";
import HomeFeatures from "../components/HomeFeatures";

export default function WithBackgroundImage() {
  return (
    <>
      <Homenavbar />
      <Flex
        w={"full"}
        h={"91vh"}
        backgroundImage={
          "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          align={"flex-start"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "6xl", md: "5xl" })}
            >
              Para un efectivo monitoreo de tu rendimiento académico
            </Text>
          </Stack>
        </VStack>
      </Flex>
      <HomeFeatures />
    </>
  );
}
