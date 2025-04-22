import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface TemporalReprojectionProps {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  renderer: THREE.WebGLRenderer | null;
}

const useTemporalReprojection = ({ scene, camera, renderer }: TemporalReprojectionProps) => {
  const previousProjectionMatrix = useRef(new THREE.Matrix4());
  const previousViewMatrix = useRef(new THREE.Matrix4());

  useEffect(() => {
	if (!scene || !camera || !renderer) {
	  return;
	}

	const updateTemporalReprojection = () => {
	  if (camera instanceof THREE.PerspectiveCamera) {
		previousProjectionMatrix.current.copy(camera.projectionMatrix);
	  }
	  if (camera) {
		previousViewMatrix.current.copy(camera.matrixWorldInverse);
	  }
	};

	renderer.domElement.addEventListener('click', updateTemporalReprojection);

	return () => {
	  renderer.domElement.removeEventListener('click', updateTemporalReprojection);
	};
  }, [scene, camera, renderer]);

  return { previousProjectionMatrix, previousViewMatrix };
};

export default useTemporalReprojection;
