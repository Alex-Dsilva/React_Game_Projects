import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Squre from './Squre'

// {{ { base:'',sm:'', md:'15%', lg:'15%', xl:'15%' }}
// w={{ base: '100%', md: '15%', lg: '15%' }}

const Board = () => {
  const [state,setstate]=useState(Array(9).fill(null))

  const [Turn,Setturn]=useState(Math.random() < 0.5) 

  const [winner, setwinner]=useState('')

  const CheckWinner =()=>{
    let winStrikes=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for(let Strike of  winStrikes ){
      console.log(Strike)
      const [a, b, c]=Strike
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]){
        return state[a];
      }
      
    }

  }

  useEffect(()=>(
    //
    setwinner(CheckWinner())
  ),[state])

  console.log(winner)

  console.log(state)
  const handleClick =(index)=>{
    if(!winner){
      const updatevalue=[...state];
    updatevalue[index]=Turn ? "X": "O";
    setstate(updatevalue);
    Setturn(!Turn)
    }
    
  }


  return (
    <Flex  w='100%'  justify='center'  p='40px' ml='-40px' > 
      <Box>
        <Squre onClick={()=>  handleClick(0)}  value={state[0]} />
        <Squre onClick={()=> handleClick(3)} value={state[3]}/>
        <Squre onClick={()=> handleClick(6)}  value={state[6]}/>
      </Box>

      <Box>
        <Squre onClick={()=> handleClick(1)}  value={state[1]}/>
        <Squre onClick={()=> handleClick(4)}  value={state[4]}/>
        <Squre onClick={()=> handleClick(7)}  value={state[7]}/>
      </Box>

      <Box>
        <Squre onClick={()=> handleClick(2)}  value={state[2]}/>
        <Squre onClick={()=> handleClick(5)} value={state[5]}/>
        <Squre onClick={()=> handleClick(8)} value={state[8]}/>
      </Box>
    </Flex>
  )
}

export default Board
