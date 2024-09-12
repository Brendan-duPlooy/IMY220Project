class Song extends React.Component 
{
  render() 
  {
    const {name,artist,url,date} = this.props;
    return(
        <div>
            <h3>{name}</h3>
            <p>{artist}</p>
            <p>{date}</p>
            {/* remember to add width and height css later */}
            <iframe src={`https://open.spotify.com/embed/track/` + url.split('/').pop()}></iframe>
        </div>
    );
  }
}

export default Song;
