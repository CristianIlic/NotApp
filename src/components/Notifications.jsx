import React from "react";
import {
  IconButton,
  MenuList,
  useColorModeValue,
  MenuItem,
  MenuButton,
  Badge,
  Menu,
  Spinner,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import useNotifications from "../hooks/useNotifications";
export default function Notifications() {
  const { notificaciones, statusNotificaciones, markAsRead } =
    useNotifications();

  if (statusNotificaciones === "loading") {
    return <Spinner color="primary" />;
  }

  console.log("notificaciones", notificaciones);
  return (
    <Menu>
      <MenuButton
        onClick={() => {
          console.log("caca");
          markAsRead(notificaciones.map(({ NO_ID_FIELD }) => NO_ID_FIELD));
        }}
      >
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={
            <Box position={"relative"}>
              <FiBell />
              {notificaciones?.filter(({ leido }) => !leido).length > 0 && (
                <Badge
                  position="absolute"
                  top={-2}
                  right={-1}
                  ml="1"
                  colorScheme="red"
                  borderRadius={"full"}
                  variant="solid"
                >
                  {notificaciones?.filter(({ leido }) => !leido).length}
                </Badge>
              )}
            </Box>
          }
          color={"white"}
          _hover={{ color: "black", bgColor: "white" }}
        />
      </MenuButton>

      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        {notificaciones?.map(({ NO_FIELD_ID, contenido }) => (
          <MenuItem key={NO_FIELD_ID}>
            <Text color={"blackAlpha.600"} fontSize={"sm"}>
              {contenido}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
