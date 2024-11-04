import React from 'react';

class Playlist extends React.Component {
  render() 
  {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const {title,img,descrpt,hashs,genre,list} = this.props;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
    return(
      <div>
        <h1>{title}</h1>
        <img src={img} alt={title}/>
        <h6>{descrpt}</h6>
        <p>{hashs}</p>
        <p>{genre}</p>
        <div>
            {list.map(index => (<div key={index.id}> <h4>{index.name}</h4> <p>{index.artist}</p> </div>))}
        </div>
      </div>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default Playlist;

  