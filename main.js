$(document).ready(() => {
    let root = $('#root');
    let play=new Play();
    play.createDiscs(5);
    play.createTowers();
});