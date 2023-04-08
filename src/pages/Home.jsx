import notAppLogo from '.././assets/logonotapp.png'

import { Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import {AiOutlineUserAdd, AiOutlineLogin} from "react-icons/ai"
import { Link } from '@chakra-ui/react'
import '.././styles/index.css'

const Home = () => {
    const title = 'NotApp'

    return (     
    <div className="home">   
      <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQhttps://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={notAppLogo} className="logo" alt="Vite logo" />
      </a>
    </div>
    <h1>{title}</h1>
    <p>Para un efectivo monitoreo de tu rendimiento académico</p>

    <Stack direction='row' spacing={10} justify='center'>
      <Link href='/signup'>
        <Button 
          leftIcon={<AiOutlineUserAdd />} 
          size="sm">
            Registrarse
        </Button>
      </Link>
      <Button 
        leftIcon={<AiOutlineLogin />} 
        size="sm">
          Iniciar sesión
      </Button>
    </Stack>
    </div>
    );
}
 
export default Home;