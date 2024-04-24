import Nav from "./components/Nav";
import Todo from "./components/Todo";
import { configWeb3Modal } from "./connection";

function App() {
  configWeb3Modal();

  return (
    <>
      <div className="">
        <Nav />
        <Todo />
      </div>
    </>
  );
}

export default App;
