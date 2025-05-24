import * as THREE from 'three';

export class Attractor {
  constructor(force) {
    this.force = force;
  }

  applyForce(object) {
    // Apply some force to the object (this is a placeholder implementation)
    object.rotation.x += this.force;
    object.rotation.y += this.force;
  }
}
