import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class Profile2 extends React.Component 
{
  render() 
  {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const { name, img} = this.props;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    return (
      <div>
        <img src={img} alt={`${name}'s profile`} />
        <h2>{name}</h2>
      </div>
    );

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  }
}

export default Profile2;


  