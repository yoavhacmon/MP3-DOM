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

const identifySong = (id) => {
    for (let i of player.songs) if (i.id === id) return i;
}

function playSong(songId) {
    if (document.getElementsByClassName("nowPlaying").length!==0){
        const previuslyPlayed = document.getElementsByClassName("nowPlaying")
        previuslyPlayed[0].classList.remove("nowPlaying")
    }
    const song = document.getElementById(`${songId}`)
    song.classList.add("nowPlaying")
    return song
}


/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const titleEl = createElement("h2", [title]);
    const albumEl = createElement("ul", "Album: ");
    albumEl.append(album);
    const artistEl = createElement("ul", "Artist: ");
    artistEl.append(artist);
    const durationEl = createElement("ul", "Duration: ");
    durationEl.append(secondsToMmss(duration))
    const imgEl = createElement("img", [], ["album-art"], { src: coverArt });
    const children = [titleEl, albumEl, artistEl, durationEl, imgEl]
    const classes = ["songs"]
    const attrs = { id ,onclick: `playSong(${id})` }
   
    return createElement("div", children, classes, attrs,)
}


/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const nameEl = createElement("h2", "Name: ");
    nameEl.append(name);
    const songsEl = createElement("h2", "Songs: ");
    songsEl.append(songs);
    const playlistDur = playlistDuration(id);
    const totalDurationInMmss = secondsToMmss(playlistDur);;
    const totalDurationEl = createElement("h4", totalDurationInMmss)
    const children = [nameEl, songsEl, totalDurationEl]
    const classes = ["playlists"] 
    const attrs = {id}
    return createElement("div", children, classes, attrs)
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
 function createElement(tagName, children = [], classes = [], attributes = {}) {
    const el = document.createElement(tagName);
  
    // Children
    for (const child of children) {
      el.append(child);
    }
  
    // Classes
    for (const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
  
    return el;
  }


// You can write more code below this line
for (let i of player.songs) {
    const songsElement = document.getElementById("songs")
    const song = createSongElement(i)
    songsElement.appendChild(song);
  }
  
  for (let i of player.playlists) {
    const playlistElement = document.getElementById("playlists")
    const playlist = createPlaylistElement(i)
    playlistElement.appendChild(playlist)
  }
  