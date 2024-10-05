

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Chala Jata Hoon", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dilbar Mere", filePath: "songs/2.mp3", coverPath: "covers/1.jpg"},
    {songName: "Kitne Bhi Tu Karle Sitam", filePath: "songs/3.mp3", coverPath: "covers/1.jpg"},
    {songName: "Mere Samne Wali Khidki Mein", filePath: "songs/4.mp3", coverPath: "covers/1.jpg"},
    {songName: "Neele Neele Ambar Par", filePath: "songs/5.mp3", coverPath: "covers/1.jpg"},
    {songName: "O Mere Dil Ke Chain", filePath: "songs/6.mp3", coverPath: "covers/1.jpg"},
    {songName: "Pal Pal Dil Ke Paas", filePath: "songs/7.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sagar Jaisi Ankhon Wali", filePath: "songs/8.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sara Zamana", filePath: "songs/9.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ye Jawani Hai Diwani", filePath: "songs/10.mp3", coverPath: "covers/1.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})


audioElement.addEventListener('timeupdate', ()=>{

    progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime =myProgressBar.value * audioElement.duration/100;
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
    if(songIndex>=9){
        songIndex = 0;
    }else{
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
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audioElement.volume = e.currentTarget.value / 100;
})