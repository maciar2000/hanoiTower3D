class Tower extends THREE.Object3D{
    constructor(x,y,z,number=0) {
        super();
        const material = new THREE.MeshBasicMaterial({color:0xaaaaaa});
        const cylinderGeometry = new THREE.CylinderGeometry(1,1,30,10);
        const baseGeometry=new THREE.CylinderGeometry(10,10,1,10);
        const tower=new THREE.Mesh(cylinderGeometry);
        const base=new THREE.Mesh(baseGeometry);
        const geometry=new THREE.Geometry();
        const loader=new THREE.FontLoader();
        tower.position.set(x,y,z);
        base.position.set(x,y-15,z);
        tower.updateMatrix();
        geometry.merge(tower.geometry,tower.matrix);
        base.updateMatrix();
        geometry.merge(base.geometry,base.matrix);
        loader.load("font/font.json",font=>{
            const textGeometry=new THREE.TextGeometry(`${number}`,{
                font:font,
                size:16,
                height:1,
                curveSegments:20
            });
            const text=new THREE.Mesh(textGeometry);
            text.position.set(x-7.5,y-32,z);
            text.updateMatrix();
            geometry.merge(text.geometry,text.matrix);
            this.mesh=new THREE.Mesh(geometry,material);
            this.add(this.mesh);
        });
    }
}