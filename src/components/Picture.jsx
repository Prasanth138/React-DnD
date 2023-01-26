import React from 'react';
import { Image } from '@chakra-ui/react';
import {useDrag} from "react-dnd";

function Picture({id, url}) {

    const [{isDragging},drag] = useDrag(()=>({
            type:"image",
            item: {id:id},
            collect: (monitor) =>({
                isDragging: !!monitor.isDragging(),
            })
    }))
  return (
  <Image
    style={{border: isDragging ? "5px solid pink" : "0px"}}
    ref={drag}
    boxSize='100px'
    objectFit='cover'
    src={url}
    py={2}
    alt='Image'
  />
  )
}

export default Picture