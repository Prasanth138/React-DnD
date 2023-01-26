// import {DndProvider} from 'react-dnd';
// import {HTML5Backend} from 'react-dnd-html5-backend';
// import DND from "./components/reactdnd";
import DND from "./components/dragdrop";
// import Dagre from './components/dagre';
function App() {
  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="App">
      <DND />
      {/* <Dagre /> */}
    </div>
    // </DndProvider>
  );
}

export default App;
