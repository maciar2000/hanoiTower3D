class Play{
    constructor() {
        this.root=$('#root');
        this.camera=new THREE.PerspectiveCamera(45,this.root.width()/this.root.height(),0.1,10000);
        this.renderer=new THREE.WebGLRenderer();
        this.scene=new THREE.Scene();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.root.width(),this.root.height());
        this.root.append(this.renderer.domElement);
        this.camera.position.set(0,0,200);
        this.camera.lookAt(0,0,0);
        this.discs=[];
        this.towers=[];
        this.render();
    }

    randomColor=(color='0x')=>{
        const chars='0123456789abcdef';
        if(color.length<8) return this.randomColor(color+chars[Math.round(Math.random() * (chars.length - 1))]);
        else return parseInt(color,16);
    }

    createDiscs=n=>{
        const max=1+(n-1)*0.3;
        for(let i=0;i<n;i++){
            this.discs[i]=new Disc(-40,i-14,0,max-i*0.3,this.randomColor());
            this.scene.add(this.discs[i]);
        }
    }

    createTowers=()=>{
        for(let i=-1;i<2;i++){
            this.towers[i+1]=new Tower(i*40,0,0,i+1);
            this.scene.add(this.towers[i+1]);
        }
    }

    render=()=>{
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene,this.camera);
    }
}