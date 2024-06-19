const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const songName = document.getElementById('song-name');
const artistName = document.getElementById('artist-name');
const albumName = document.getElementById('album-name');
const playlistElement = document.getElementById('playlist');
const currentTimeElement = document.getElementById('current-time');
const durationTimeElement = document.getElementById('duration-time');
const volumeElement = document.getElementById('volume-percentage');

const songs = [
    { name: 'Baarish', artist: 'Half Girlfriend', album: 'Unknown', src: 'Music/01_-_Baarish_-_Half_Girlfriend_DJMaza.Life.mp3', image: 'images/Baarish.jpeg' },
    { name: 'Gulaabo', artist: 'Unknown', album: 'Unknown', src: 'Music/01_-_Gulaabo-MyMp3Singer.net.mp3', image: 'images/gulaabo.jpg' },
    { name: 'Soch Na Sake (Duet)', artist: 'Unknown', album: 'Unknown', src: 'Music/01_-_Soch_Na_Sake_Duet-MyMp3Singer.com.mp3', image: 'images/sochnasake.jpeg' },
    { name: 'Aaj Se Teri', artist: 'Padman', album: 'Unknown', src: 'Music/Aaj_Se_Teri_Padman_128_Kbps.mp3', image: 'images/aajseteri.jpg' },
    { name: 'Asal Mein', artist: 'Darshan Raval', album: 'Unknown', src: 'Music/Asal_Mein_-_Darshan_Raval_128_Kbps.mp3', image: 'images/asalmein.jpg' },
    { name: 'Attention', artist: 'Charlie Puth', album: 'Unknown', src: 'Music/Attention_-_Charlie_Puth.mp3', image: 'images/attention.png' },
    { name: 'Bekhayali', artist: 'Kabir Singh', album: '128 Kbps', src: 'Music/Bekhayali_-_Kabir_Singh_128_Kbps.mp3', image: 'images/bekhayali.jpg' },
    { name: 'Girls Like You', artist: 'Maroon 5 ft. Cardi B', album: 'Unknown', src: 'Music/Maroon_5_-_Girls_Like_You_ft._Cardi_B.mp3', image: 'images/girlslikeyou.jpg' },
    { name: 'Let Me Love You', artist: 'DJ Snake ft. Justin Bieber', album: 'Unknown', src: 'Music/DJ_Snake_-_Let_Me_Love_You_ft._Justin_Bieber.mp3', image: 'images/letmeloveyou.jpg' },
    { name: 'Tie Me Down', artist: 'Gryffin ft. Elley Duhé', album: 'Unknown', src: 'Music/Gryffin_-_Tie_Me_Down_ft._Elley_Duhé.mp3', image: 'images/tiemedown.jpg' },
    { name: 'Ban Ja Tu Meri Rani', artist: 'Guru Randhawa', album: 'Unknown', src: 'Music/Guru_Randhawa_-_Ban_Ja_Tu_Meri_Rani.mp3', image: 'images/banjarani.jpg' },
    { name: 'Haaye Oye', artist: 'Unknown', album: 'Unknown', src: 'Music/Haaye_Oye_-_amlijatt.in.mp3', image: 'images/haayeoye.jpg' },
    { name: 'I Like Me Better', artist: 'Lauv', album: 'Unknown', src: 'Music/Lauv_-_I_Like_Me_Better.mp3', image: 'images/ilikemebetter.jpg' },
    { name: 'A Sky Full Of Stars', artist: 'Coldplay', album: 'Unknown', src: 'Music/Coldplay_-_A_Sky_Full_Of_Stars.mp3', image: 'images/skyfullofstars.jpg' },
    { name: 'The Ocean', artist: 'Mike Perry ft. Shy Martin', album: 'CC', src: 'Music/Mike_Perry_-_The_Ocean_ft._Shy_Martin_CC.mp3', image: 'images/ocean.jpg' },
    { name: 'Kabira', artist: 'Unknown', album: 'Yeh Jawaani Hai Deewani', src: 'Music/Songs.PK_08_-_Kabira_-_Yeh_Jawaani_Hai_Deewani.mp3', image: 'images/kabira.jpg' },
    { name: 'Sun Saathiya', artist: 'Unknown', album: 'Unknown', src: 'Music/Sun_Saathiya.mp3', image: 'images/sunsaathiya.jpg' },
    { name: 'Tujhe Kitna Chahne Lage', artist: 'Kabir Singh', album: '128 Kbps', src: 'Music/Tujhe_Kitna_Chahne_Lage_-_Kabir_Singh_128_Kbps.mp3', image: 'images/tujhekitnachahnelagehum.jpg' }
];

let currentSongIndex = 0;
let isShuffle = false;

function searchPlaylist() {
    let filter = document.getElementById('searchInput').value.toUpperCase();
    let li = playlistElement.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        let h4 = li[i].getElementsByTagName('h4')[0];
        let txtValue = h4.textContent || h4.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

function loadSong(song) {
    songName.textContent = song.name;
    artistName.textContent = song.artist;
    albumName.textContent = song.album;
    audio.src = song.src;
    audio.load();
    document.getElementById('song-image').src = song.image;
    updateVolumeDisplay();
}

function playMusic() {
    audio.play();
}

function pauseMusic() {
    audio.pause();
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
}

function volumeUp() {
    if (audio.volume < 1) {
        audio.volume += 0.1;
    }
    updateVolumeDisplay();
}

function volumeDown() {
    if (audio.volume > 0) {
        audio.volume -= 0.1;
    }
    updateVolumeDisplay();
}

function updateVolumeDisplay() {
    volumeElement.textContent = Math.round(audio.volume * 100) + '%';
}

function updateProgress() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercentage;
    updateCurrentTime();
    updateDurationTime();
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function updateCurrentTime() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}

function updateDurationTime() {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    durationTimeElement.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    document.getElementById('shuffle-button').textContent = isShuffle ? 'Shuffle On' : 'Shuffle Off';
}

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playMusic();
}

function prevSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    playMusic();
}

// Event Listeners
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);

// Load the first song by default
loadSong(songs[currentSongIndex]);

// Populate playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${song.image}" alt="${song.name}">
        <div>
            <h4>${song.name}</h4>
            <p>${song.artist}</p>
        </div>
    `;
    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
        playMusic();
    });
    playlistElement.appendChild(li);
});
