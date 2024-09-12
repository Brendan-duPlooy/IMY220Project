import React from 'react';

class ListComments extends React.Component 
{
  render() 
  {
    const {list} = this.props;
    return(
      <div>
        {list.map(index => <Comment key={index.id} {...index}/>)}
      </div>
    );
  }
}

export default ListComments;
