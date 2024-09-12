import React from 'react';

class Comment extends React.Component 
{
  render() 
  {
    const {img,username,comment} = this.props;
    return(
      <div>
        <img src={img} alt="Picture"/>
        <h4>{username}</h4>
        <p>{comment}</p>
      </div>
    );
  }
}

export default Comment;
