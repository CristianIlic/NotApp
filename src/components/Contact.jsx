import React, { useRef } from "react";
import { FormControl, Input, Textarea, Button, Text } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dkgm1nw",
        "template_rtaeubj",
        form.current,
        "Yi2Sz8BpNYNP4mEzw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="form-control">
      <Text color="black" fontSize="30px">
        Contáctanos
      </Text>
      <form onSubmit={sendEmail} ref={form} className="--form-control --card">
        <FormControl>
          <Input
            mb="1vh"
            type="text"
            placeholder="Nombre completo"
            name="user_name"
            isRequired
          />
          <Input
            mb="1vh"
            type="email"
            placeholder="Email"
            name="user_email"
            isRequired
          />
          <Input
            mb="1vh"
            type="text"
            placeholder="Asunto"
            name="asunto"
            isRequired
          />
          <Textarea name="mensaje" mb="1vh" cols="30" rows="10"></Textarea>
          <Button
            bg="primary"
            color="white"
            margin="15px"
            _hover={{
              background: "primaryHover",
            }}
            type="submit"
          >
            Enviar mensaje
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default Contact;
