// TEST
import React from 'react';
import { button, Link, NavLink } from 'react-router-dom';

class Featured extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: this.props.songs,
      song: 0,
      mouseHover: false,
      mouseIdx: null,
      event: "",
    };

    this.songDropdown = this.songDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.addSongState = this.addSongState.bind(this);
    this.saveSong = this.saveSong.bind(this);

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    this.playSong = this.playSong.bind(this);
    this.currentSongIdx = this.currentSongIdx.bind(this);
    this.play = this.play.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.changeIcon = this.changeIcon.bind(this);

// SAVE/REMOVE FROM LIBRARY
    this.renderRemovedSong = this.renderRemovedSong.bind(this);
    this.renderSavedSong = this.renderSavedSong.bind(this);
    this.renderClear = this.renderClear.bind(this);
    
    //TEST
    // this.changeDuration = this.changeDuration.bind(this);
    // this.changeTitle = this.changeTitle.bind(this);
  }

  componentDidMount() {
    this.props.fetchSongs();
    // TEST 
    // this.props.fetchSongs();
  }
   
  songDropdown(e) {
    let songName = e.target.id + 1;
    document.getElementById(songName).classList.toggle("show");
  }

  removeSong(e) {
    let userId = this.props.user.id;
    let currSongId = e.currentTarget.id;

    let currSong = this.props.songs.filter(song => song.id === parseInt(currSongId))[0];
    let songsUsers = currSong.songsUsers;

    let currSongUser = songsUsers.filter(songsUser => songsUser.user_id === userId);
    
    for (let i = 0; i < currSongUser.length; i++) {
      let user = currSongUser[i];
      this.props.deleteSongsUser(user.id);
    }

// SAVE/REMOVE FROM LIBRARY
    setTimeout(this.renderRemovedSong, 0);
    setTimeout(this.renderClear, 2500);
  }

  closeDropdown(e) {
    let songName = e.target.id + 1;
    
    if (!e.target.matches('.dropdown-button')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    } else {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.id === songName) {
          continue;
        } else if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  addSongState(e) {
    let songId = e.currentTarget.id;
    this.setState({
      song: parseInt(songId)
    });
    this.props.receiveCurrentSongId(parseInt(e.currentTarget.id));
  }

  mouseEnter(idx) {
    return() => {
      this.setState({
        mouseHover: true,
        mouseIdx: idx
      });
    };
  }

  mouseLeave() {
    return() => {
      this.setState({
        mouseHover: false,
        mouseIdx: null
      });
    };
  }

  currentSongIdx(songs, song) {
    for (let i = 0; i < songs.length; i++) {
      if (songs[i] === song) {
        return i;
      }
    }
  }

  handlePlay(song) {
    song.play();
  }

  handleStop(song) {
    song.currentTime = 0;
    song.pause();
  }

  play(song) {
    let music = this.props.currentSong ? document.getElementById(this.props.currentSong.id) : null;
    let music2 = document.getElementById(song.id);

    if (music === music2 && this.props.play) {
      // music2.pause();
      this.props.receivePause(song, this.props.songs);
    } else {
      this.props.receivePlay(song, this.props.songs);
      // this.handlePlay(music2);
      if (music && music !== music2) {
        // this.handleStop(music);
      }
    }
  }

  // MAKE AUDIO PLAY
  playSong(e) {
    let song = this.props.songs.filter( song => song.title === e.currentTarget.id)[0];
    let songs = this.props.songs.map(song => song);

    let songIdx = this.currentSongIdx(songs,song);
    
    let prev;
    let next;
    if (songIdx === 0) {
      prev = songs[songs.length - 1];
      next = songs[songIdx + 1];
    } else if (songIdx === songs.length - 1) {
      prev = songs[songIdx - 1];
      next = songs[0];
    } else {
      prev = songs[songIdx - 1];
      next = songs[songIdx + 1];
    }
    this.props.receiveCurrentSong(song, next, prev);

    // this.props.fetchCurrentSong(this.props.user.id, song.id);

    this.play(song);
  }

  // NEED TO CHANGE
  changeIcon(e) {
    // console.log(e.currentTarget);
    // console.log(e.target);
    e.target.src = window.whiteMusic2;
    // this.changeDuration(e);
    // this.changeTitle(e);
    this.playSong(e);
  }

  // NEED TO CHANGE
  // changeDuration(e) {
  //   let durations = document.getElementsByClassName("song-duration-green");
  //   let duration = document.getElementById(e.currentTarget.id).getElementsByClassName("song-duration")[0];
  //   let duration2 = document.getElementById(e.currentTarget.id).getElementsByClassName("song-duration-green")[0];
  //   if (duration) {
  //     duration.className = "song-duration-green";
  //     for (let i = 0; i < durations.length; i++) {
  //       if (parseInt(durations[i].id) !== e.currentTarget.value) {
  //         durations[i].className="song-duration";
  //       }
  //     }
  //   } else {
  //     duration2.className = "song-duration";
  //   }
  // }

  // // NEED TO CHANGE
  // changeTitle(e) {
  //   let titles = document.getElementsByClassName("song-title-green");
  //   let title = document.getElementById(e.currentTarget.id).getElementsByClassName("song-title")[0];
  //   let title2 = document.getElementById(e.currentTarget.id).getElementsByClassName("song-title-green")[0];
  //   if (title) {
  //     title.className = "song-title-green";
  //     for (let i = 0; i < titles.length; i++) {
  //       if (titles[i].innerText !== e.currentTarget.id) {
  //         titles[i].className="song-title";
  //       }
  //     }
  //   } else {
  //     title2.className = "song-title";
  //   }
  // }

  saveSong(e) {
    let songId = e.target.id;
    this.props.createSongsUser(this.props.user.id, songId);

// SAVE/REMOVE FROM LIBRARY
    setTimeout(this.renderSavedSong, 0);
    setTimeout(this.renderClear, 2500);
  }

// SAVE/REMOVE FROM LIBRARY
  renderClear() {
    document.getElementById("state-event").innerHTML = "";
      this.setState( {
        event: ""
      });
  }

  renderSavedSong() {
    this.setState({
      event: "Saved Song to Library"
    });
    document.getElementById("state-event").innerHTML = "Saved Song to Library";
  }

  renderRemovedSong() {
    this.setState({
      event: "Remove Song from Library"
    });
    document.getElementById("state-event").innerHTML = "Removed Song from Library";
  }

  render() {
    let songs = this.props.songs.filter(song => song.title);

    let musicPlay = (<img className="music-icon" src={window.whitePlay2}/>);
    let musicNote = (<img className="music-icon" src={window.whiteMusic2}/>);

    return(
      <div className="songs-component" onClick={this.closeDropdown}>

{/* SAVE/REMOVE FROM LIBRARY */}
        <div className="event-test">
          {(this.state.event.length > 0) ?
            (<div className="event-flex">
              {(this.state.event.length > 0) ? (<div className="event-librarySongs" id="state-event"></div>) : (<div></div>)}
              {(this.state.event.length > 0 ) ? (<button className="close-event" onClick={this.renderClear}>X</button>) : (<div></div>)}
            </div>) : (<div></div>)
          }
        </div>
        
        <ul className="ul-songs">
            {/* USED IMPLICIT RETURN ON MAP */}
          {songs.map( (song,idx) => (
            <li 
              className="li-songs" 
              id={song.title} 
              key={idx} 
              value={idx}
              onMouseEnter={this.mouseEnter(idx)} 
              onMouseLeave={this.mouseLeave()} 
              onDoubleClick={this.changeIcon} >
              {/* <audio id={song.id} preload="true">
                <source src={song.songUrl} />
              </audio> */}
              <div className="song-index">
                {/* <button className="song-play-button"></button> */}
                <div className="left-song left-user-song">
                  <ul className="music-img">
                    <li className="music-img" id={song.title} value={idx} onClick={this.changeIcon}>
                      { this.state.mouseIdx === idx ? musicPlay : musicNote }
                    </li>
                  </ul>
                  <div className="left-song-info">
{/* TITLE COLOR CHANGE */}
                {(this.props.currentSong) ?
                    (this.props.currentSong.title === song.title) ? 
                      (<div className="song-title-green">{song.title}</div>) : 
                      (<div className="song-title">{song.title}</div>)
                      :
                      (<div className="song-title">{song.title}</div>)
                  }
{/* <div className="song-title">{song.title}</div> */}
                    <span><Link className="song-artist albumshow-artistname" to={`/artists/${song.artist.id}`}>{song.artist.name}</Link></span>
                    <span className="split-dot">.</span>
                    <span><Link className="song-album albumshow-artistname" to={`/albums/${song.album.id}`}>{song.album.title}</Link></span>
                  </div>
                </div>
                <div className="song-dropdown" >
                  <button id={song.title} className="dropdown-button" onClick={this.songDropdown}>...</button>
                  <div id={song.title + 1} className="dropdown-content">
                    <a id={song.id} onClick={this.saveSong}>Save to your Library</a>
                    <a id={song.id} onClick={this.removeSong}>Remove from Your Library</a>
                    {/* <a id={song.id} className="remove-padding" onClick={this.addSongState}>{this.props.openModal}</a> */}
                    <a id={song.id} className="remove-padding" onClick={this.addSongState}>
                      <div onClick={() => this.props.openModal('add', song.id)}>
                        <div className="add-playlist">Add to Playlist</div>
                      </div>
                    </a>
                  </div>
{/* DURATION COLOR CHANGE */}
                  {(this.props.currentSong) ?
                    (this.props.currentSong.title === song.title) ? 
                      (<span className="song-duration-green">{song.duration}</span>) : 
                      (<span className="song-duration">{song.duration}</span>)
                      :
                      <span className="song-duration">{song.duration}</span>
                  }
{/* <span className="song-duration">{song.duration}</span> */}
                </div>
              </div>
              {/* <audio className="audio-songs" controls="controls" preload="auto">
                <source src={song.songUrl} />
              </audio> */}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Featured