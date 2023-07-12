import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

// DEB UI
// const debug = new dat.GUI();

// Create Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#ffffff");

// Model
var wwdLogo: any = null;
const wwdMtl = new MTLLoader();
wwdMtl.load("src/Models/Obj/wwd.mtl", function (material: any) {
  const wwdObj = new OBJLoader();
  wwdObj.setMaterials(material);
  wwdObj.load("src/Models/Obj/wwd.obj", function (mesh: any) {
    mesh.traverse(function (node: any) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    scene.add(mesh);
    mesh.scale.set(1, 1, 1);
    mesh.position.y = -0.7;
    console.log("mesh:", mesh);
    wwdLogo = mesh;
    scene.add(wwdLogo);
  });
});

// Box

var mouse = new THREE.Vector2();

function onMouseMove(event: any) {
  // Calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  wwdLogo.rotation.x = -mouse.y * 1;
  wwdLogo.rotation.y = mouse.x * 1.5;
}

// Add event listener for mouse move
document.addEventListener("mousemove", onMouseMove, false);
//   Axes
const asexhelper = new THREE.AxesHelper(5);
asexhelper.visible = false;
scene.add(asexhelper);

// Light
const directionalLight = new THREE.PointLight("#ffffff", 0.2);
const AmbientLight = new THREE.AmbientLight("#ffffff", 1);
const directionalLightHelper = new THREE.PointLightHelper(
  directionalLight,
  0.3
);
scene.add(directionalLightHelper);
directionalLight.position.set(-3, 2, 5);
scene.add(AmbientLight, directionalLight);

// Sizes
const Size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// CAMERA
const camera = new THREE.PerspectiveCamera(1, Size.width / Size.height);
camera.position.z = 100;
scene.add(camera);
const canvas: any = document.querySelector(".webgl_wwd_model_anim");

// Controls
// const controls = new OrbitControls(camera, canvas);

// RENDRER
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(Size.width, Size.height);

// Animation

const startAnim = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(startAnim);
};
startAnim();
