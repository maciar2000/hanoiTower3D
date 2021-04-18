class Play {
    constructor() {
        const root = $('#root');
        this.camera = new THREE.PerspectiveCamera(45, root.width() / root.height(), 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(root.width(), root.height());
        root.append(this.renderer.domElement);
        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(0, 0, 0);
        this.discs = [];
        this.towers = [];
        this.n = 5;
        this.start = false;
        this.position = {
            x:this.n*4,
            y: -((this.n + 5) / 2) + 1
        };
        this.move = 0;
        this.render();
    }

    randomColor = (color = '0x') => {
        const chars = '0123456789abcdef';
        if (color.length < 8) return this.randomColor(color + chars[Math.round(Math.random() * (chars.length - 1))]);
        else return parseInt(color, 16);
    }

    createDiscs = () => {
        const max = 1 + (this.n - 1) * 0.3;
        for (let i = 0; i < this.n; i++) {
            this.discs[this.n - i - 1] = new Disc(-1 * this.n * 4, i - ((this.n + 5) / 2) + 1, 0, max - i * 0.3, this.randomColor());
            this.scene.add(this.discs[this.n - i - 1]);
        }
        console.log(this.discs[this.n - 1].position)
    }

    createTowers = () => {
        for (let i = -1; i < 2; i++) {
            this.towers[i + 1] = new Tower(i * this.n * 4, 0, 0, this.n, i + 1);
            this.scene.add(this.towers[i + 1]);
        }
    }

    moveTower = (n, from, to, other) => {
        if (n >= 0) {
            this.moveTower(n - 1, from, other, to);
            console.log(`d: ${n} from ${from} to ${to}`);
            // this.discs[n].position.x=(to-1)*this.n*4
            this.moveTower(n - 1, other, to, from);
        }
        this.move = 'UP';
        // this.discs[0].position.y=this.n*2;
    }

    render = () => {
        if (this.start) {
            if (this.camera.position.z < this.n * 10) this.camera.position.z += 0.1 * this.n;
            else this.start = false;
            this.camera.lookAt(0, 0, 0);
        }
        if (this.move === 'UP') {
            if (this.discs[0].position.y < this.n * 2) this.discs[0].position.y += 0.1;
            else this.move = 'RIGHT';
        }
        if (this.move === 'RIGHT') {
            if (this.discs[0].position.x < this.position.x) this.discs[0].position.x += 0.1;
            else this.move = 'DOWN';
        }
        if (this.move === 'DOWN') {
            if (this.discs[0].position.y > this.position.y) this.discs[0].position.y -= 0.1;
            else this.move = 0;
        }
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}