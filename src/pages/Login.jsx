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

const Login = () => {
    return (
        <div className="form-control">
            <FormControl>
                <HiOutlineUser size='50px' />
                <FormLabel fontWeight='bold'>Ingresa tu RUT</FormLabel>
                    <Input borderWidth='3px' type='text' />

                <FormLabel fontWeight='bold'>Contraseña</FormLabel>
                    <Input borderWidth='3px' type='password' />

                <Button 
                size="sm"
                bg="secondary"
                color='white'
                margin='15px'>
                Iniciar sesión
                </Button>

            </FormControl>   
        </div>
    );
}
 
export default Login
