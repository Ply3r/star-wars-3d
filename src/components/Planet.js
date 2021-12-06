import * as THREE from 'three';
import images from '../images/images';

const Planet = (diameter, name) => {
  const size = Math.floor(Number(diameter)/1000)
  const texture = new THREE.TextureLoader().load(images[name])
  const planetShape = new THREE.SphereGeometry(size, 60, 30)
  const image = new THREE.MeshStandardMaterial({ map: texture })
  const planet = new THREE.Mesh(planetShape, image)

  return planet
}

export default Planet;
