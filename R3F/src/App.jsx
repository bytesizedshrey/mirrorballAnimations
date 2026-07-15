import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <div className="parent flex h-screen w-full">
      <Canvas camera={{ position: [5, 2.5, 5], fov: 40 }}>
        <OrbitControls makeDefault enablePan={false} maxPolarAngle={Math.PI / 2 - 0.05} />
        <Experience />
      </Canvas>
    </div>
  );
};

export default App;
