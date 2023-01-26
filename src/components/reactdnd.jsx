import { Stack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Picture from "./Picture";
import PicturesJSON from "./PictureList.json";
import { Box } from "@chakra-ui/react";
import { useDrop } from "react-dnd";

function DragDrop() {
    const [pictures, setPictures] = useState(() => PicturesJSON);
    const [board, setBoard]=useState([]);

    const [{isOver},drop] = useDrop(() => ({
        accept : "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) =>({
            isDragging: !!monitor.isOver(),
        })
    }))

    const addImageToBoard = (id) => {
        const pictureList = pictures.filter((picture) => id === picture.id);
        setBoard((board) => [...board, ...pictureList]);
        //Find the index of the image in the pictures array
        const index = pictures.findIndex(picture => picture.id === id);
        //Remove the image from the pictures array
        if(index !== -1) pictures.splice(index, 1);
        //update the pictures state
        setPictures(pictures);
    };

  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <VStack m={5}>
        <Box
          w={["sm", "2xl"]}
          h={["sm", "xl"]}
          m={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w={["sm", "ls"]}
            bg="green.50"
            h={["sm", "ls"]}
            borderRadius="15px 0 0 15px"
            p={5}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {pictures.map((picture) => {
              return <Picture url={picture.url} id={picture.id} key={picture.id} />;
            })}
          </Box>
          <Box
            w={["sm", "ls"]}
            bg="pink.50"
            h={["sm", "ls"]}
            p={5}
            flexDirection="column"
            borderRadius="0 15px 15px 0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ref={drop}
          >
            {board.map((picture) => {
              return <Picture url={picture.url} id={picture.id}  key={picture.id}/>;
            })}
          </Box>
        </Box>
      </VStack>
    </Stack>
  );
}

export default DragDrop;
