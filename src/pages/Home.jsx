import reactLogo from '.././assets/react.svg'
import viteLogo from '/vite.svg'

import { Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import {AiOutlineUserAdd, AiOutlineLogin} from "react-icons/ai"
import { Link } from '@chakra-ui/react'

const Home = () => {
    const title = 'NotApp'

    return (     
    <div className="home">   

      <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <h1>{title}</h1>

    <Stack direction='row' spacing={10} justify='center'>
      <Link href='/signup'>
        <Button 
          leftIcon={<AiOutlineUserAdd />} 
          size="sm">
            <p>Registrarse</p>
        </Button>
      </Link>
      <Button 
        leftIcon={<AiOutlineLogin />} 
        size="sm">
          <p>Iniciar sesión</p>
      </Button>
    </Stack>
    </div>
    );
}
 
export default Home;