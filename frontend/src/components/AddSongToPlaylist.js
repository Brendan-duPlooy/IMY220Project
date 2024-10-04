class AddSongToPlaylist extends React.Component 
{
  render() 
  {
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
}

export default AddSongToPlaylist;
