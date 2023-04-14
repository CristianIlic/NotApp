import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Button,
    RadioGroup,
    Radio,
    HStack
  } from '@chakra-ui/react'

  import {HiOutlineUser} from "react-icons/hi"

const SignUp = () => {
    return (
        <div className="form-control">
            <FormControl>
                <HiOutlineUser size='50px' />
                <FormLabel fontWeight='bold'>Nombres</FormLabel>
                    <Input borderWidth='3px' type='text' />

                <FormLabel fontWeight='bold'>Apellidos</FormLabel>
                    <Input borderWidth='3px' type='text' />

                <FormLabel fontWeight='bold'>RUT</FormLabel>
                    <Input borderWidth='3px' type='text' />

                <FormLabel fontWeight='bold'>Género</FormLabel>
                <RadioGroup defaultValue='Hombre'>
                    <HStack spacing='20px'>
                        <Radio value='Hombre'>Hombre</Radio>
                        <Radio value='Mujer'>Mujer</Radio>
                        <Radio value='Otro'>Otro</Radio>
                    </HStack>
                </RadioGroup>

                <FormLabel fontWeight='bold'>Correo electrónico</FormLabel>
                    <Input borderWidth='3px' type='email' />

                <FormLabel fontWeight='bold'>Contraseña</FormLabel>
                    <Input borderWidth='3px' type='password' />

                    <FormLabel>Repite tu contraseña</FormLabel>
                    <Input borderWidth='3px' type='password' />

                <FormLabel fontWeight='bold'>Tipo de usuario</FormLabel>
                <Select borderWidth='3px' placeholder='Seleccione un usuario'>
                    <option value='Alumno'>Alumno</option>
                    <option value='Profesor'>Profesor</option>
                    <option value='Apoderado'>Apoderado</option>
                </Select>

                <Button 
                size="sm"
                bg="secondary"
                color='white'
                margin='15px'
                _hover={{
                    background:"white",
                    color:"#27E1C1"
                  }}>
                Registrarse
                </Button>

            </FormControl>   
        </div>
    );
}
 
export default SignUp
