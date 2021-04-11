class Play{
    constructor() {
        this.root=$('#root');
        this.camera=new THREE.PerspectiveCamera(45,this.root.width()/this.root.height(),0.1,10000);
        this.renderer=new THREE.WebGLRenderer();
        this.scene=new THREE.Scene();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.root.width(),this.root.height());
        this.root.append(this.renderer.domElement);
        this.camera.position.set(100,0,0);
        this.camera.lookAt(0,0,0);
        this.axes=new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.render();
    }
    render=()=>{
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene,this.camera);
    }
}