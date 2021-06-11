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
        url: 'assets/musics/Dastzanan.mp3',
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
let isPlaying = null;
let isPlayingIcons = null;

/*** initial player ***/
playerEl.style.setProperty('--player-bg', musicsList[1].bg_color);

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
            addToRecentlyPlayedList(i);
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
    playerEl.style.setProperty('--player-bg', musicsList[index].bg_color);
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

function addToRecentlyPlayedList(i) {
    setTimeout(function () {
        document.querySelector('.music-list__item:last-child').remove();
    }, 500);

    let newItem = document.createElement("LI");
    newItem.className = 'music-list__item';
    let newMusic = document.createElement("DIV");
    newMusic.className = 'music-list__left';
    let newCover = document.createElement('IMG');
    newCover.className = 'music-list__cover';
    newCover.src = musicsList[i].cover;
    let newInfo = document.createElement("DIV");
    newInfo.className = 'music-list__info';
    newInfo.className += ' ellipsis';
    let newName = document.createElement("DIV");
    let newNameText = document.createTextNode(musicsList[i].name);
    newName.appendChild(newNameText);
    let newArtist = document.createElement("DIV");
    newArtist.className = 'subtitle';
    newArtist.className += ' text-light';
    let newArtistText = document.createTextNode(musicsList[i].artist);
    newArtist.appendChild(newArtistText);

    let newControlers = document.createElement("DIV");
    newControlers.className = 'music-list__right';
    let newDuration = document.createElement("DIV");
    newDuration.className = 'text-light';
    let newDurationText = document.createTextNode(format(isPlaying.duration));
    newDuration.appendChild(newDurationText);

    let newPlayIcons = document.createElement("DIV");
    newPlayIcons.className = 'music-list__play-btn';
    let newPlaySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newPlaySvg.setAttribute("width", "50%");
    newPlaySvg.setAttribute("height", "50%");
    newPlaySvg.className.baseVal = 'play';
    let newPlayUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
    newPlayUse.setAttribute("href", "./assets/images/feather.svg#play");
    newPlaySvg.appendChild(newPlayUse);
    let newPauseSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newPauseSvg.setAttribute("width", "50%");
    newPauseSvg.setAttribute("height", "50%");
    newPauseSvg.className.baseVal = 'pause';
    let newPauseUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
    newPauseUse.setAttribute("href", "./assets/images/feather.svg#play");
    newPlaySvg.appendChild(newPauseUse);

    let newAddIcon = document.createElement("DIV");
    newAddIcon.classList = 'music-list__add-to';
    let newAddSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newAddSvg.setAttribute('width', '50%');
    newAddSvg.setAttribute('height', '50%');
    newAddUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
    newAddUse.setAttribute("href", "./assets/images/feather.svg#plus-square");
    newAddSvg.appendChild(newAddUse);

    newControlers.appendChild(newDuration);
    newPlayIcons.appendChild(newPlaySvg);
    newPlayIcons.appendChild(newPauseSvg);
    newAddIcon.appendChild(newAddSvg);
    newControlers.appendChild(newPlayIcons);
    newControlers.appendChild(newAddIcon);

    newInfo.appendChild(newName);
    newInfo.appendChild(newArtist);
    newMusic.appendChild(newCover);
    newMusic.appendChild(newInfo);
    newItem.appendChild(newMusic);
    newItem.appendChild(newControlers);

    const list = document.querySelector('.music-list');
    list.insertBefore(newItem, list.childNodes[0]);

}

function format(time) {

    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    let ret = "";
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
}
