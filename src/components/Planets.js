import React, { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { myContext } from '../context/MyProvider';
import Planet from './Planet';

const Planets = () => {
  const { data, filters: { order }, actualPosition } = useContext(myContext);
  const { column, sort } = order
  let hold = data;

  hold = hold.sort(({ [column]: valueA }, { [column]: valueB }) => {
    const minusOne = -1;

    let bool = Number(valueA) > Number(valueB) ? minusOne : 1;
    if (sort === 'ASC') {
      bool = Number(valueA) > Number(valueB) ? 1 : minusOne;
    }

    if (column === 'name') {
      bool = valueB > valueA ? 1 : minusOne;
      if (sort === 'ASC') {
        bool = valueA > valueB ? 1 : minusOne;
      }
    }

    return bool;
  });

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000)
    const render = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') })
    document.body.appendChild( render.domElement );


    camera.position.z = 200
    const controls = new OrbitControls(camera, render.domElement)
  
    render.setPixelRatio( window.devicePixelRatio )
    render.setSize(window.innerWidth, window.innerHeight)

    const planets = []
    hold.forEach(({ diameter, rotation_period, name }) => {
      const planet = Planet(diameter, name)
      planets.push({ planet, rotation_period })
    })

    if (planets.length) {
      scene.add(planets[actualPosition].planet)
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, .1)
    const light = new THREE.PointLight(0xffffff, 1, 0)
    light.position.z = 500
    scene.add(light)
    scene.add(ambientLight)

    const addStars = () => {
      for(let c = 0; c < 150; c += 1) {
        const shape = new THREE.SphereGeometry(1, 60, 30)
        const color = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const star = new THREE.Mesh(shape, color)

        const x = Math.floor(Math.random() * 2000) - 1500
        const y = Math.floor(Math.random() * 2000) - 1500
        const z = Math.floor(Math.random() * 2000) - 1500

        star.position.x = x
        star.position.y = y
        star.position.z = z

        scene.add(star)
      }
      render.render(scene, camera)
    }
    addStars()

    window.addEventListener('resize', () => {
      render.setPixelRatio(window.devicePixelRatio)
      render.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
    })

    const animate = () => {
      requestAnimationFrame( animate )

      if (planets.length) {
        const { planet, rotation_period } = planets[actualPosition]
        const realRotation = Number(rotation_period) / 1000
        planet.rotation.y += realRotation
      }
      
      controls.update()
      render.render(scene, camera)
    }
    animate()

    
  }, [data, order, actualPosition])

  return (
    <canvas id="canvas" />
  );
};

export default Planets;
