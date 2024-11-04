class AddSongToPlaylist extends React.Component 
{
  render() 
  {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
    const {playlists} = this.props;
    return(
        <form>
            <h3>Select a Playlist: </h3>
            <select>
                {playlists.map(playlist, index => <option key={index} value={playlist._id}>{playlist.name}</option>)}
            </select>
            <button type="submit">Add</button>
        </form>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default AddSongToPlaylist;
