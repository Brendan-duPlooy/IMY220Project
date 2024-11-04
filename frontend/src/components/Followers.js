import React from 'react';

class Followers extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
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
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default Followers;