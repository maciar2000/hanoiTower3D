$(document).ready(() => {
    let play=new Play();
    $('#btnStart').on('click',()=>{
        const n=parseInt($('#number').val());
        const to=parseInt($('#tower').val());
        if(n<2) return;
        if(to>2 || to<1) return;
        play.n=n
        play.to=to;
        play.createTowers();
        $('#start').hide(1000)
        setTimeout(()=>play.moveDiscs(),5000);
    });
});