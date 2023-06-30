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
            <Stack direction={"row"}>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                ¿Cómo funciona?
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <HomeFeatures />
    </>
  );
}
