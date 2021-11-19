import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene(); // kind of container that holds all objects cameras and lights. scene == container

const camera = new THREE.PerspectiveCamera(
  130,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// first argument is a field view, second argument aspect ratio

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(15);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(8, 3, 16, 400);
const material = new THREE.MeshStandardMaterial({
  color: 0x49ef4,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xfff48b);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// // const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper /*gridHelper*/);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xff8658 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("./pictures/universe.jpeg");
scene.background = spaceTexture;

const arekTexture = new THREE.TextureLoader().load("./pictures/profile.jpg");

async function loadArek() {
  const arek = await new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: arekTexture })
  );
  scene.add(arek);
}
loadArek();

const JSTexture = new THREE.TextureLoader().load("./pictures/js.png");

const js = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshBasicMaterial({ map: JSTexture })
);
scene.add(js);

js.position.z = 10;
js.position.setX(20);
js.position.setY(15);

const jupiterTexture = new THREE.TextureLoader().load("./pictures/react.jpeg");
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

scene.add(jupiter);

jupiter.position.z = 15;
jupiter.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  jupiter.rotation.z += 0.05;

  arek.rotation.y += 0.01;
  arek.rotation.z += 0.01;
  camera.position.setY(75);

  camera.position.z = t * -0.03;
  camera.position.x = t * -0.001;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  js.rotation.x += 0.01;
  js.rotation.y += 0.003;
  js.rotation.z += 0.01;

  jupiter.rotation.x += 0.02;
  jupiter.rotation.y += 0.003;
  jupiter.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
