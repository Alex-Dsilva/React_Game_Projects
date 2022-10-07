// import { Box, Input,  Text } from '@chakra-ui/react'
import { Input, Text, Button, Box} from "@chakra-ui/react"
import React, { useContext } from 'react'
import { WinnerContext } from "../Context/WinnerContext"


const Entername = ({handleChange}) => {
  const value=useContext(WinnerContext)
  console.log(value)
  console.log(value.name)
  return (
    <Box w={{base:'100%', md:'25%', lg:'25%', xl:'25%'}} m='auto' p='20px' alignItems='center' mt='50px' justifyContent='center' display='flex' flexDir='column' gap='20px' border='1px solid' >
      <Box>
      <Text>Team X</Text>
      <Input  width='auto' onChange={() => handleChange} type="text" name="PlayerX" placeholder='Enter Player X' />
      </Box>
      <Box>
      <Text>Team O</Text>
      <Input  width='auto' type="text" onChange={() => handleChange} name="PlayerY" placeholder='Enter Player O' />
      </Box>
      
      <Button>Enter</Button>

    </Box>
  )
}

export default Entername
