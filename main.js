$(document).ready(() => {
    let play=new Play();
    $('#btnStart').on('click',()=>{
        const n=parseInt($('#number').val());
        if(n<2) return;
        play.n=n
        play.start=true;
        play.createTowers();
        play.createDiscs();
        $('#start').hide(1000)
        setTimeout(()=>play.moveTower(n-1,0,2,1),2000);
    });
});