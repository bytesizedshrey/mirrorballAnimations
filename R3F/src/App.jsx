import { Canvas, useFrame } from "@react-three/fiber";
import Experience from "./components/Experience";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <div className="parent flex h-screen w-full">
      {/* <Canvas camera={{position : [0,15,0]}}> */}
      <Canvas>
        <OrbitControls/>
        <Experience />
      </Canvas>
    </div>
  );
};

export default App;
