import { useControls } from "leva";
import React, { useMemo } from "react";
import { images } from "../Data/Images";
import ImagePlane from "./ImagePlane";


const FanGroup = () => {
  const { numPlanes, spreadAngle, planeWidth, planeHeight } = useControls("Book Fan Controls", {
    numPlanes: {
      value: 6,
      min: 2,
      max: 40,
      step: 1,
      label: "No. of Planes",
    },
    spreadAngle: {
      value: 120,
      min: 20,
      max: 320,
      step: 1,
      label: "Spread Angle",
    },
    planeWidth: {
      value: 2.5,
      min: 0.4,
      max: 6,
      step: 0.05,
      label: "Plane Width",
    },
    planeHeight: {
      value: 2.5,
      min: 0.4,
      max: 8,
      step: 0.05,
      label: "Plane Height",
    },
    positionY: {
        value: -1.5,
        min: -6,
        max: 6,
        step: 0.05,
        label: "Y Position",
      },
  });
  const planes = useMemo(()=>{
    const count = numPlanes
    const totalArcRad = (spreadAngle / Math.pi) / 180
    const step = totalArcRad / (count - 1)
    const startingAngle = - totalArcRad / 2

    return Array.from({length: count},(_,i)=>{
        const angle = startingAngle + i * step
        return {
            key : i,
            url: images[i % images.length],
            position : [0,0,0],
            rotation : [0,angle,0]
        }
    })
  },[numPlanes, spreadAngle])
  return <group>
    {planes.map((plane)=>(<ImagePlane key={plane.key} url={plane.url} position={plane.position} rotation={plane.rotation} planeWidth={planeWidth} planeHeight={planeHeight}/>))}
  </group>
};

export default FanGroup;
