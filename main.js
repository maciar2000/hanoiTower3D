$(document).ready(() => {
    let play=new Play();
    play.createTowers();
    $('#btnStart').on('click',()=>{
        const n=parseInt($('#number').val());
        if(n<2) return;
        $('#root').empty();
        play=new Play();
        play.n=n
        play.start=true;
        play.createTowers();
        play.createDiscs();
        $('#start').hide(1000)
    });
});