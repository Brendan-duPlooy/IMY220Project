import React from 'react';

class Followers extends React.Component 
{
  render() 
  {
    const {list} = this.props;
    return(
        <div>
            {list.map(index => 
                <ProfilePreview key={index.id} {...index}/>
            )}
        </div>
    );
  }
}

export default Followers;