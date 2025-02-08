AFRAME.registerComponent("movement-constraint", {
    schema: {
      minX: { type: "number", default: -40 },
      maxX: { type: "number", default: 40 },
      minY: { type: "number", default: 0 },
      maxY: { type: "number", default: 16 },
      minZ: { type: "number", default: -40 },
      maxZ: { type: "number", default: 40 },
    },
    tick: function () {
      const camera = this.el;
      const position = camera.getAttribute("position");
  
      let x = Math.min(Math.max(position.x, this.data.minX), this.data.maxX);
      let y = Math.min(Math.max(position.y, this.data.minY), this.data.maxY);
      let z = Math.min(Math.max(position.z, this.data.minZ), this.data.maxZ);
  
      camera.setAttribute("position", { x: x, y: y, z: z });
    },
  });
  
  AFRAME.registerComponent("add-classroom-items", {
    init: function () {
      const scene = this.el;
  
      const deskPositions = [
        { x: -10, y: 0, z: 10 },
        { x: 10, y: 0, z: 10 },
  
        { x: -10, y: 0, z: 0 },
        { x: 10, y: 0, z: 0 },
  
        { x: -10, y: 0, z: -10 },
        { x: 10, y: 0, z: -10 },
      ];
  
      deskPositions.forEach((position) => {
        const desk = document.createElement("a-entity");
        desk.setAttribute("obj-model", "obj: #deskModel");
        desk.setAttribute("position", `${position.x} ${position.y} ${position.z}`);
        desk.setAttribute("scale", "0.8 0.8 0.8");
        desk.setAttribute("material", "color: #4d4d4d");
        scene.appendChild(desk);
      });
    },
  });
  