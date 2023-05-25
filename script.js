console.log("Welcome to Spotify-Retro");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mere Sapno Ki Rani", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Roop Tera Mastana", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Badan Pe Sitare Lapete", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chalte Chalte Mere Yeh Geet", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Chura Liya Hai Tumne", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Khoya Khoya Chand", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Jeena Yahan Marna Yahan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Yeh Dosti Hum Nahin", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "O Mere Dil Ke Chain", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mere Mehboob Qayamat Hogi", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Mere Dil Mein Aaj Kya Hai", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Bhanwara Bada Nadan", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

audioElement.addEventListener('timeupdate', ()=>{
    var q=parseInt(audioElement.currentTime);
    var w=parseInt(audioElement.duration)
    var a=q/60;
    a=parseInt(a);
    if (a<9) {
        a="0"+a;
    }
    var b=q%60;
    b=parseInt(b);
    if (b<9) {
        b="0"+b;
    }
    var c=w/60;
    c=parseInt(c);
    if (c<9) {
        c="0"+c;
    }
    var d=w%60;
    d=parseInt(d);
    if (d<9) {
        d="0"+d;
    }
    document.getElementById("time").innerHTML=a+":"+b+"/"+c+":"+d;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=11){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 11;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})