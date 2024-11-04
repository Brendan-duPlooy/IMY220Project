import React from 'react';

class AddComment extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  render() 
  {
    const {calledFunc} = this.props;
    return(
      <form onSubmit={calledFunc}>
        <label>Comment<textarea placeholder="I love this music!" required></textarea></label>
        <label>Add an image <input type="text" placeholder="https://open.spotify.com/track/2398y439dfjkn24fsdg234w.jpg"/></label>
        <button type="submit">Submit</button>
      </form>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default AddComment;

  