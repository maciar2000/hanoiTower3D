class Tower extends THREE.Object3D{
    constructor(x,y,z,discs,number=0) {
        super();
        const material = new THREE.MeshBasicMaterial({color:0xaaaaaa});
        const cylinderGeometry = new THREE.CylinderGeometry(0.1*discs,0.1*discs,discs+5,10);
        const baseGeometry=new THREE.CylinderGeometry(discs,discs,1,10);
        const tower=new THREE.Mesh(cylinderGeometry);
        const base=new THREE.Mesh(baseGeometry);
        const geometry=new THREE.Geometry();
        const loader=new THREE.FontLoader();
        tower.position.set(x,y,z);
        base.position.set(x,y-((discs+5)/2),z);
        tower.updateMatrix();
        geometry.merge(tower.geometry,tower.matrix);
        base.updateMatrix();
        geometry.merge(base.geometry,base.matrix);
        loader.load("font/font.json",font=>{
            const textGeometry=new THREE.TextGeometry(`${number}`,{
                font:font,
                size:discs,
                height:0,
                curveSegments:10
            });
            const text=new THREE.Mesh(textGeometry);
            text.position.set(x-(discs/2),y-((discs+5)/2)-discs-2,z);
            text.updateMatrix();
            geometry.merge(text.geometry,text.matrix);
            this.mesh=new THREE.Mesh(geometry,material);
            this.add(this.mesh);
        });
    }
}