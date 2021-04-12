class Disc extends THREE.Mesh{
    constructor(x,y,z,r,color=0xff0000) {
        super();
        this.material=new THREE.MeshBasicMaterial({color:color});
        this.geometry=new THREE.CylinderGeometry(3*r,3*r,1,10,1);
        this.position.set(x,y,z)
    }
}