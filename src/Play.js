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
        this.move={
            direction:'',
            position:{
                x:this.n*4,
                y:-((this.n + 5) / 2) + 1
            },
            disc:0,
next:'',
            towerPosition:[0,0,0]
        }
        this.moveDescription=[];
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
        this.move.towerPosition[0]=this.n;
    }

    createTowers = () => {
        for (let i = -1; i < 2; i++) {
            this.towers[i + 1] = new Tower(i * this.n * 4, 0, 0, this.n, i + 1);
            this.scene.add(this.towers[i + 1]);
        }
    }

    hanoiAlgorithm = (n, from, to, other) => {
        if (n >= 0) {
            this.hanoiAlgorithm(n - 1, from, other, to);
            this.moveDescription.push(`${n},${to},${from}`);
            this.hanoiAlgorithm(n - 1, other, to, from);
        }
    }

    moveDiscs=(i=0)=>{
        if(i<this.moveDescription.length) {
            const current = this.moveDescription[i].split(',');
            this.move.direction = 'UP';
            this.move.disc = current[0];
            this.move.position.x = (current[1] - 1) * this.n * 4;
            this.move.position.y = this.move.towerPosition[current[1]] - ((this.n + 5) / 2) + 1;
            this.move.towerPosition[current[1]]++;
            this.move.towerPosition[current[2]]--;
            this.move.next = i + 1;
        }
    }

    render = () => {
        if (this.start) {
            if (this.camera.position.z < this.n * 10) this.camera.position.z += 0.1 * this.n;
            else this.start = false;
            this.camera.lookAt(0, 0, 0);
        }
        if (this.move.direction === 'UP') {
            if (this.discs[this.move.disc].position.y < this.n*2) this.discs[this.move.disc].position.y += 1;
            else this.move.direction = (this.discs[this.move.disc].position.x>this.move.position.x?'LEFT':'RIGHT');
        }
        if (this.move.direction === 'DOWN') {
            if (this.discs[this.move.disc].position.y > this.move.position.y) this.discs[this.move.disc].position.y -= 1;
            else {
                this.move.direction = '';
                this.moveDiscs(this.move.next);
            }
        }
        if (this.move.direction === 'RIGHT') {
            if (this.discs[this.move.disc].position.x < this.move.position.x) this.discs[this.move.disc].position.x += 1;
            else this.move.direction = 'DOWN';
        }
        if (this.move.direction === 'LEFT') {
            if (this.discs[this.move.disc].position.x > this.move.position.x) this.discs[this.move.disc].position.x -= 1;
            else this.move.direction = 'DOWN';
        }
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
}