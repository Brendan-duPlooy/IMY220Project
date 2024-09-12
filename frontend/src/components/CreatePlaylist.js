import React from 'react';

class CreatePlaylist extends React.Component 
{
  render() 
  {
    const {calledFunc} = this.props;
    return(
        <form onSubmit={calledFunc}>
            <label>Name <input required type="text" placeholder="Highway to Heaven"/></label>
            <label>Description <textarea placeholder="A mix of rock and lofi music"></textarea></label>
            <label>Hashtags <input type="text" placeholder="#rockLofi#socool" /></label>
            <label>Genre 
                <select>
                    <option value="piratemetal">Pirate Metal</option>
                    <option value="folktronica">Folktronica</option>
                    <option value="mathrock">Math Rock</option>
                    <option value="kawaiimetal">Kawaii metal</option>
                    <option value="vaporwave">Vaporwave</option>
                </select>
            </label>
            <label>Image URL <input type="text" placeholder="Cover Image URL"/></label>
            <button type="submit">Create</button>
        </form>
    );
  }
}

export default CreatePlaylist;
