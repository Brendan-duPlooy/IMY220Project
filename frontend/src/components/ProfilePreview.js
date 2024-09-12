import React from 'react';

class ProfilePreview extends React.Component 
{
  render() 
  {
    const {pfName,bio,img} = this.props;
    return(
        <div>
            {/* image will be the background */}
            <img src={img} alt={pfName} />
            {/* name will be on the bottom left */}
            <h3>{pfName}</h3>
            {/* with the description underneath it */}
            <p>{bio}</p>
        </div>
    );
  }
}

export default ProfilePreview;

  