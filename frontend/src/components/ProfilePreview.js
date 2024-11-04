import React from 'react';

class ProfilePreview extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  render() 
  {
    const {pfName,bio,img} = this.props;
    return(
        <div>
            <img src={img} alt={pfName} />
            <h3>{pfName}</h3>
            <p>{bio}</p>
        </div>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default ProfilePreview;

  