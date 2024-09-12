import React from 'react';

class EditProfile extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {checkEmpty: '', checkOver70: '', nameErrorFail: '', bioErrorFail: '', showErrorsOrNot: false,};
  }

  // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  render() 
  {
    return(
      <form onSubmit={this.showErrorsOrNotCall}>

        <div>
            <label>Name&nbsp;
                <input required type="text" value={this.state.checkEmpty} placeholder="Jacques" onChange={this.checkEmptyCall}/>
            </label>
            <p>{this.state.nameErrorFail}</p>
        </div>

        <div>
            <label>&nbsp;&nbsp;&nbsp;Bio&nbsp;&nbsp;
                <textarea value={this.state.checkOver70} placeholder="Becoming batman for gotham" onChange={this.checkOver70Call}></textarea>
            </label>
            <p>{this.state.bioErrorFail}</p>
        </div>

        <button type="submit" disabled={!this.state.showErrorsOrNot}>&nbsp;Save</button>

      </form>
    );
  }

  // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  checkEmptyCall =(indexParam) =>{
    const checkEmpty = indexParam.target.value;

    this.setState({ checkEmpty }, ()=>{
      const isValid = checkEmpty !== '';

      this.setState({
        nameErrorFail: isValid ? '' : 'Is not allowed to be empty',
        showErrorsOrNot: 70 >= this.state.checkOver70.length && isValid,
      });

    });

  };

  // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  //Do nothing (for now, will change later)
  showErrorsOrNotCall =(indexParam) =>{
    indexParam.preventDefault();
  };

  // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  checkOver70Call =(indexParam) =>{
    const checkOver70 = indexParam.target.value;

    this.setState({checkOver70}, ()=>{
      const isValid = 70 >= checkOver70.length;

      this.setState({
        bioErrorFail: isValid ? '' : 'Must be equal or less van 70 characters',
        showErrorsOrNot: this.state.checkEmpty !== '' && isValid,
      });

    });

  };
}

export default EditProfile;
