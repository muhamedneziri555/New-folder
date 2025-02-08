import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set camera to a forward view position
camera.position.set(0, 15, 30); // Positioned on the "front" of the scene
camera.lookAt(0, 0, 0); // Look toward the center of the scene

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Ground
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Grass green color
const ground = new THREE.Mesh(groundGeometry, grassMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Road
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Dark gray color for road

// Curve path for the road
const curvePath = new THREE.CurvePath();
curvePath.add(new THREE.LineCurve3(new THREE.Vector3(-8, 0.01, 5), new THREE.Vector3(-2, 0.01, 5)));
curvePath.add(new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-2, 0.01, 5),
    new THREE.Vector3(1, 0.01, 3),
    new THREE.Vector3(5, 0.01, -2)
));
curvePath.add(new THREE.LineCurve3(new THREE.Vector3(5, 0.01, -2), new THREE.Vector3(8, 0.01, -8)));

const roadGeometry = new THREE.TubeGeometry(curvePath, 100, 0.5, 8, false);
const road = new THREE.Mesh(roadGeometry, roadMaterial);
scene.add(road);

// Buildings arranged in a triangular pattern
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF }); // White color for buildings

// Building 1
const building1 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 6), whiteMaterial);
building1.position.set(-6, 1, 10);
scene.add(building1);

// Building 2
const building2 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 6), whiteMaterial);
building2.position.set(3, 1, 8);
scene.add(building2);

// Building 3
const building3 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 6), whiteMaterial);
building3.position.set(-3, 1, -2);
scene.add(building3);

// Moving Sphere on the Road Path
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow sphere
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-8, 0.5, 5);
scene.add(sphere);

let speed = 0.005; // Speed of the sphere
let t = 0; // Parameter for position on curve path

// Function to update sphere position along the curve path
function updateSpherePosition() {
  t += speed;
  if (t > 1 || t < 0) speed = -speed; // Reverse direction at endpoints

  const point = curvePath.getPointAt(t);
  sphere.position.set(point.x, point.y + 0.5, point.z);
}

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  updateSpherePosition();
  renderer.render(scene, camera);
}
animate();