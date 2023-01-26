import React, { useState } from "react";
import { Stack, Box, Image } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";

const itemsFromBackend = [
  {
    id: nanoid(),
    content:
      "https://www.bhaktiphotos.com/wp-content/uploads/2018/04/Mahadev-Bhagwan-Photo-for-Devotee.jpg",
  },
  {
    id: nanoid(),
    content:
      "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320",
  },
  {
    id: nanoid(),
    content:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoJfj_I545bjYfGDKt9MUQXZaRAdolVYbBg&usqp=CAU",
  },
  //   { id: nanoid(), content: "Fourth task" },
  //   { id: nanoid(), content: "Fifth task" }
];

const columnsFromBackend = {
  [nanoid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [nanoid()]: {
    name: "To do",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DragDrop() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Stack
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Box
 
              display="flex"
              flexDirection="column"
              alignItems="center"
              key={columnId}
            >
              <Box style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <Box
                      display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              w={["200px", "350px"]}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                //   <Box
                                //     ref={provided.innerRef}
                                //     {...provided.draggableProps}
                                //     {...provided.dragHandleProps}
                                //     style={{
                                //       userSelect: "none",
                                //       padding: 16,
                                //       margin: "0 0 8px 0",
                                //       minHeight: "50px",
                                //       backgroundColor: snapshot.isDragging
                                //         ? "#263B4A"
                                //         : "#456C86",
                                //       color: "white",
                                //       ...provided.draggableProps.style,
                                //     }}
                                //   >
                                    <Image
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 0,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                      boxSize="100px"
                                      objectFit="cover"
                                      src={item.content}
                                      py={2}
                                      alt="Image"
                                     />
                                //   </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </Box>
                    );
                  }}
                </Droppable>
              </Box>
            </Box>
          );
        })}
      </DragDropContext>
    </Stack>
  );
}

export default DragDrop;






























// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { nanoid } from 'nanoid'

// const itemsFromBackend = [
//   { id: nanoid(), content: "First task" },
//   { id: nanoid(), content: "Second task" },
//   { id: nanoid(), content: "Third task" },
//   { id: nanoid(), content: "Fourth task" },
//   { id: nanoid(), content: "Fifth task" }
// ];

// const columnsFromBackend = {
//   [nanoid()]: {
//     name: "Requested",
//     items: itemsFromBackend
//   },
//   [nanoid()]: {
//     name: "To do",
//     items: []
//   },

// };

// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination } = result;

//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = columns[source.droppableId];
//     const destColumn = columns[destination.droppableId];
//     const sourceItems = [...sourceColumn.items];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems
//       }
//     });
//   } else {
//     const column = columns[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...column,
//         items: copiedItems
//       }
//     });
//   }
// };

// function App() {
//   const [columns, setColumns] = useState(columnsFromBackend);
//   return (
//     <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
//       <DragDropContext
//         onDragEnd={result => onDragEnd(result, columns, setColumns)}
//       >
//         {Object.entries(columns).map(([columnId, column], index) => {
//           return (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center"
//               }}
//               key={columnId}
//             >
//               <h2>{column.name}</h2>
//               <div style={{ margin: 8 }}>
//                 <Droppable droppableId={columnId} key={columnId}>
//                   {(provided, snapshot) => {
//                     return (
//                       <div
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                         style={{
//                           background: snapshot.isDraggingOver
//                             ? "lightblue"
//                             : "lightgrey",
//                           padding: 4,
//                           width: 250,
//                           minHeight: 500
//                         }}
//                       >
//                         {column.items.map((item, index) => {
//                           return (
//                             <Draggable
//                               key={item.id}
//                               draggableId={item.id}
//                               index={index}
//                             >
//                               {(provided, snapshot) => {
//                                 return (
//                                   <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     style={{
//                                       userSelect: "none",
//                                       padding: 16,
//                                       margin: "0 0 8px 0",
//                                       minHeight: "50px",
//                                       backgroundColor: snapshot.isDragging
//                                         ? "#263B4A"
//                                         : "#456C86",
//                                       color: "white",
//                                       ...provided.draggableProps.style
//                                     }}
//                                   >
//                                     {item.content}
//                                   </div>
//                                 );
//                               }}
//                             </Draggable>
//                           );
//                         })}
//                         {provided.placeholder}
//                       </div>
//                     );
//                   }}
//                 </Droppable>
//               </div>
//             </div>
//           );
//         })}
//       </DragDropContext>
//     </div>
//   );
// }

// export default App;
