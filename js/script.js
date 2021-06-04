let musicsList = [
    {
        id: 1,
        url: 'assets/musics/oblivion.mp3',
        cover: 'assets/images/astor.jpg',
        bg_color: '#20191f',
        name: 'Oblivion',
        artist: 'Astor Piazzolla'
    },
    {
        id: 2,
        url: 'assets/musics/Daste Zanan.mp3',
        cover: 'assets/images/Kamakan.jpg',
        bg_color: '#382725',
        name: 'Dastzanan',
        artist: 'Mehdi Saki'
    },
    {
        id: 3,
        url: 'assets/musics/Sabreen_Love_on_the_Palestinian_Way.mp3',
        cover: 'assets/images/hobb.jpg',
        bg_color: '#53584d',
        name: 'Love on the Palestinian Way',
        artist: 'Kamelia Jobran'
    },
    {
        id: 4,
        url: 'assets/musics/Di Goldene Pave.mp3',
        cover: 'assets/images/die-goldene-pave.jpg',
        bg_color: '#524033',
        name: 'Di Goldene Pave',
        artist: 'Chava Alberstein'
    },
    {
        id: 5,
        url: 'assets/musics/La Mouch.mp3',
        cover: 'assets/images/album-yanass.jpg',
        bg_color: '#342a25',
        name: 'La Mouch',
        artist: 'Yasmine Hamdan'
    },
    {
        id: 6,
        url: 'assets/musics/ghatre.mp3',
        cover: 'assets/images/sky.jpg',
        bg_color: '#9a9394',
        name: 'Ghatre',
        artist: 'Mohammadreza Eshaaghi'
    },
    {
        id: 7,
        url: 'assets/musics/vaagard.mp3',
        cover: 'assets/images/tirishko.jpg',
        bg_color: '#7c4740',
        name: 'Vaagard',
        artist: 'Heydoo Hedayati'
    },
    {
        id: 8,
        url: 'assets/musics/Ghesey-paria.mp3',
        cover: 'assets/images/ghese.jpg',
        bg_color: '#5e4843',
        name: 'Gheseye Paria',
        artist: 'Karen Homayoonfar'
    },
];

let musics = document.querySelectorAll('.music');
let playerEl = document.querySelector('.player');
let playerCoverEl = document.querySelector('.player__image img');
let playerTitleEl = document.querySelector('.player__name');
let playerAtristEl = document.querySelector('.player__artist');
let playerRangeEl = document.querySelector('.player__range');
let currentTimeEl = document.querySelector('.player__currentTime');
let durationEl = document.querySelector('.player__duration');
var isPlaying = null;
var isPlayingIcons = null;

/*** initial player ***/
// isPlaying = musics[0].querySelector('audio');
// isPlayingIcons = musics[0].querySelector('.play-btn');
// controlPlayIcons(isPlayingIcons, 'pause');
// play(0, isPlaying, isPlayingIcons);

musics.forEach((x, i) => {
    x.querySelector('img.cover').src = musicsList[i].cover;
    x.querySelector('.music-row__title').innerHTML = musicsList[i].name;
    x.querySelector('.music-row__artist').innerHTML = musicsList[i].artist;
    let audio = x.querySelector('audio');
    audio.src = musicsList[i].url;
    audio.load();
    let playBtn = x.querySelector('.play-btn');
    playBtn.onclick = function () {
        if (isPlaying != audio) {
            if (isPlaying) {
                isPlaying.pause();
                isPlaying.currentTime = 0;
                controlPlayIcons(isPlayingIcons, 'pause');
            }
            play(i, audio, playBtn);
        } else {
            if (audio.paused) {
                play(i, audio, playBtn);
            } else {
                audio.pause();
                controlPlayIcons(playBtn, 'pause');
            }
        }

    }
});

function play(index, music, icons) {
    playerCoverEl.src = musicsList[index].cover;
    playerTitleEl.innerHTML = musicsList[index].name;
    playerAtristEl.innerHTML = musicsList[index].artist;
    playerEl.style.setProperty('--player-bg', musicsList[index].bg_color || "darkcyan");
    music.play();
    isPlaying = music;
    isPlayingIcons = icons;
    controlPlayIcons(icons, 'play');
    durationEl.innerHTML = format(isPlaying.duration);
    isPlaying.addEventListener('timeupdate', function () {
        currentTimeEl.innerHTML = format(isPlaying.currentTime);
        playerRangeEl.style.setProperty('--range', (isPlaying.currentTime / isPlaying.duration) * 100 + '%');
    })

    music.onended = function () {
        controlPlayIcons(icons, 'pause');
    }
}

function controlPlayIcons(iconsContainer, state) {
    let playIcon = iconsContainer.querySelector('.play');
    let pauseIcon = iconsContainer.querySelector('.pause');
    if (state === 'play') {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    if (state === 'pause') {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
    }
}

function format(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + (mins < 10 ? "0" : "");
    ret += "" + mins;
    ret += ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

playerRangeEl.onmouseup = function (e) {
    let viewportOffset = playerRangeEl.getBoundingClientRect();
    let posX = e.clientX - viewportOffset.left;
    playerRangeEl.style.setProperty('--range', posX + 'px');
    isPlaying.currentTime = (posX / viewportOffset.width) * isPlaying.duration;
    // playerRangeEl.onmousemove = function (e) {
    //     //let viewportOffset = playerRangeEl.getBoundingClientRect();
    //     let posX2 = e.clientX - viewportOffset.left;
    //     playerRangeEl.style.setProperty('--range', posX2 + 'px');
    //     //document.onmouseup = closeDragElement;
    //     //document.onmousedown = closeDragElement;
    // };
    document.onmousedown = closeDragElement;

}



function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    //document.onmousemove = null;
}

