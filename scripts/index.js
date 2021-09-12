/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function secondsToMmss(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

const identifySong = (id) => {
    for (let i of player.songs) if (i.id === id) return i;
}
function playSong(songId) {
    if (document.getElementsByClassName("nowPlaying").length !== 0) {
        const previuslyPlayed = document.getElementsByClassName("nowPlaying");
        previuslyPlayed[0].classList.remove("nowPlaying");
    }
    const song = document.getElementById(`${songId}`)
    song.classList.add("nowPlaying")
    return song
}


/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const coverArtPic = coverArt
    const children = [title, album, artist, secondsToMmss(duration)]
    const classes = ["songs"]
    const attrs = { id, onclick: `playSong(${id})` }
    return createElement("div", children, classes, attrs, coverArtPic)
}


/**
 * Creates a playlist DOM element based on a playlist object.
 */
function playlistDuration(id) {
    let totalDuration = 0;
    for (let i of player.playlists) {
        if (i.id === id) {
            for (let j of i.songs) {
                for (let n of player.songs) {
                    if (n.id === j) {
                        totalDuration += n.duration;

                    }

                }
            }

        }
    } return totalDuration;
}

function createPlaylistElement({ name, songs }) {
    for (let playlist of player.playlists) {
        let id = playlist.id;
        playlistDuration(id);

    }
    const children = [name, songs, totalDuration];

    return createElement("div", children);
}


/**
 * Creates a new DOM element. 
 
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, coverArtPic = "") {
    let newElement = document.createElement(tagName)
    for (let [att, value] of Object.entries(attributes)) {
        newElement.setAttribute(`${att}`, `${value}`)
    }
    for (let cls of classes) {
        newElement.classList.add(`${cls}`)
    }
    for (let child of children) {
        const newChild = document.createElement(tagName)
        newChild.textContent = `${child}`
        newElement.appendChild(newChild)
    }
    if (coverArtPic.length > 0) {
        const coverArt = document.createElement("img")
        coverArt.setAttribute("src", `${coverArtPic}`)
        newElement.appendChild(coverArt)
    }
    return newElement
}


// You can write more code below this line

for (let i of player.songs) {
    const songsElement = document.getElementById("songs")
    const song = createSongElement(i)
    songsElement.appendChild(song);
}

for (let j of player.playlists) {
    const playlistElement = document.getElementById("playlists")
    const playlist = createPlaylistElement(j)
    playlistElement.appendChild(playlist)
}