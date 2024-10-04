import React from 'react';

class PlaylistPreview extends React.Component {
  render() {
    const { name, description, imageUrl } = this.props;
    return (
      <div>
        {/* image will be the background */}
        <img src={imageUrl} alt={name} />
        {/* name will be on the bottom left */}
        <h3>{name}</h3>
        {/* with the description underneath it */}
        <p>{description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;

