import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const  Squre = (el) => {
  return (
    <Box border='1px solid' h='40px' w='40px' onClick={el.onClick}>
      <Text  as='b' fontSize='24px'>{el.value}</Text>
    </Box>
  )
}

export default Squre
