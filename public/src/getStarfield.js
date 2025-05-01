// import * as THREE from "three";

// export default function getStarfield({ numStars = 500 } = {}) {
//   function randomSpherePoint() {
//     const radius = Math.random() * 25 + 25;
//     const u = Math.random();
//     const v = Math.random();
//     const theta = 2 * Math.PI * u;
//     const phi = Math.acos(2 * v - 1);
//     let x = radius * Math.sin(phi) * Math.cos(theta);
//     let y = radius * Math.sin(phi) * Math.sin(theta);
//     let z = radius * Math.cos(phi);

//     return {
//       pos: new THREE.Vector3(x, y, z),
//       hue: 0.6,
//       minDist: radius,
//     };
//   }
//   const verts = [];
//   const colors = [];
//   const positions = [];
  
//   let col;
//   for (let i = 0; i < numStars; i += 1) {
//     let p = randomSpherePoint();
//     const { pos, hue } = p;
//     positions.push(p);
//     col = new THREE.Color().setHSL(hue, 0.2, Math.random());
//     verts.push(pos.x, pos.y, pos.z);
//     colors.push(col.r, col.g, col.b);
//   }
//   const geo = new THREE.BufferGeometry();
//   geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
//   geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
//   const mat = new THREE.PointsMaterial({
//     size: 0.2,
//     vertexColors: true,
//     map: new THREE.TextureLoader().load(
//       "../textures/stars/circle.png"
//     ),
//   });
//   const points = new THREE.Points(geo, mat);
//   return points;
// }
import * as THREE from "three";

export default function getStarfield({ numStars = 500, connectDistance = 5 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }

  const positions = [];
  const colors = [];
  const verts = [];

  for (let i = 0; i < numStars; i++) {
    const pos = randomSpherePoint();
    positions.push(pos);
    verts.push(pos.x, pos.y, pos.z);
    const col = new THREE.Color().setHSL(0.6, 0.2, Math.random());
    colors.push(col.r, col.g, col.b);
  }

  // Points (stars)
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  pointsGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const starTexture = new THREE.TextureLoader().load("../textures/stars/circle.png");
  const pointsMaterial = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: starTexture,
    transparent: true
  });
  const points = new THREE.Points(pointsGeometry, pointsMaterial);

  // Lines (connections)
  const lineVerts = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dist = positions[i].distanceTo(positions[j]);
      if (dist < connectDistance) {
        lineVerts.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa, opacity: 0.5, transparent: true });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

  // Group stars + connections
  const group = new THREE.Group();
  group.add(points);
  group.add(lines);

  return group;
}
