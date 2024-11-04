import React from 'react';

class EditPlaylist extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  render()
  {
    const {calledFunc} = this.props;
    return(
      <form onSubmit={calledFunc}>
        <label>Name <input required type="text" placeholder="Highway to Heaven"/></label>
        <label>Description <textarea placeholder="A mix of rock and lofi music"></textarea></label>
        <label>Hashtags <input type="text" placeholder="#rockLofi#socool" /></label>
        <label>Image URL <input type="text" placeholder="https://open.spotify.com/track/2398y439dfjkn24fsdg234w"/></label>
        <button type="submit">Save</button>
      </form>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default EditPlaylist;
