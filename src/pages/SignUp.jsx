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

  import { Form } from 'react-router-dom';

  import {HiOutlineUser} from "react-icons/hi"

  import { useFirebaseApp } from 'reactfire';
  import { useForm } from 'react-hook-form';

  import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignUp = () => {
    
    const { handleSubmit, formState: {errors}, trigger, register, watch} = useForm();

    async function onHandleSubmit(data){
        try{
            await createUserWithEmailAndPassword(
                auth, data.email, data.password, data.name)
                history.push("/");
                alert ("Usuario creado correctamente")
            } catch (error) {
                console.log(error)
                alert ("Fallo la creacion de jajajaja")
                alert(error);
            } 
            
        }

    return (
        <div className="form-control">
            <FormControl onSubmit={handleSubmit(onHandleSubmit)}>
                <HiOutlineUser size='50px' />
                <FormLabel fontWeight='bold'>Nombres</FormLabel>
                    <Input borderWidth='3px'
                    id="email"
                    name="email"
                    type= 'email'
                    required={false}
                    {...register("email", {
                    required: "Email is Required!!!" ,
                    pattern: {
                    value: '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i',
                    message: "Invalid email address",
                    }})} 
                    />

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
                onClick={() => onHandleSubmit()} 
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
