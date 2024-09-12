import React from 'react';

class SearchInput extends React.Component 
{
  render() 
  {
    const {startSearching} = this.props;
    return(
        <input 
          placeholder="..." type="text" 
          onChange={i => 
              startSearching(i.target.value)
          }
        />
    );
  }
}

export default SearchInput;
