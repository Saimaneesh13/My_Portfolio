import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '../../store/useSceneStore';
import { CAMERA_PRESETS } from '../../lib/constants';

export const CameraRig: React.FC = () => {
  const { camera, pointer } = useThree();
  const activeSection = useSceneStore((state) => state.activeSection);
  const inspectMode = useSceneStore((state) => state.inspectMode);

  // Reusable vectors to avoid allocations in render loop
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const preset = CAMERA_PRESETS[activeSection] || CAMERA_PRESETS.home;

    // Smooth speed multiplier
    const lerpSpeed = Math.min(delta * 2.5, 0.1);

    // If inspect mode is on, pull closer and allow wider mouse pan
    const mouseInfluenceX = inspectMode ? pointer.x * 0.8 : pointer.x * 0.35;
    const mouseInfluenceY = inspectMode ? pointer.y * 0.6 : pointer.y * 0.25;

    targetPos.current.set(
      preset.position[0] + mouseInfluenceX,
      preset.position[1] + mouseInfluenceY,
      inspectMode ? preset.position[2] * 0.75 : preset.position[2]
    );

    targetLook.current.set(
      preset.target[0] + mouseInfluenceX * 0.2,
      preset.target[1] + mouseInfluenceY * 0.2,
      preset.target[2]
    );

    // Smooth camera position
    camera.position.lerp(targetPos.current, lerpSpeed);

    // Smooth camera lookAt point
    currentLook.current.lerp(targetLook.current, lerpSpeed);
    camera.lookAt(currentLook.current);

    // Update projection if FOV changes
    if ((camera as THREE.PerspectiveCamera).fov !== preset.fov) {
      (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
        (camera as THREE.PerspectiveCamera).fov,
        preset.fov,
        lerpSpeed
      );
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
};

export default CameraRig;
