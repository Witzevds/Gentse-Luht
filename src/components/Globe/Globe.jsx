import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Globe = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000 // Increased far clipping plane to allow zooming out farther
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    new THREE.TextureLoader().load(
      "/Variables/Assets/earth-3.jpg", // Replace with the correct path to the texture
      function (texture) {
        const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(5, 32, 32),
          sphereMaterial
        );
        scene.add(sphere);

        // Set initial camera position to zoom out
        camera.position.set(0, 0, 15); // Move the camera further away

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = true; // Enable panning to move the globe and scroll under it
        controls.maxDistance = 100; // Limit how far you can zoom out
        controls.minDistance = 6; // Limit how far you can zoom in

        function animate() {
          requestAnimationFrame(animate);

          // Optional: Add some rotation to the Earth
          sphere.rotation.y += 0.01;

          controls.update(); // Update controls on each frame
          renderer.render(scene, camera);
        }

        animate();
      }
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
};

export default Globe;
