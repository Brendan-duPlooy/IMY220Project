import React from 'react';

class LoginForm extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state ={checkAt: '', checkAbove5: '', checkAtFail: '', checkAbove5Fail: '', showErrorsOrNot: false,};
    }

    // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    render() 
    {
        const {checkAtFail,checkAbove5Fail,showErrorsOrNot} = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;
                        <input required type="checkAt" placeholder="u65784389@up.ac.za" onChange={this.checkAtCall}/>
                        <p>{checkAtFail}</p>
                    </label>
                </div>

                <div>
                    <label>Password&nbsp;&nbsp;
                        <input required type="checkAbove5" placeholder="*********" onChange={this.checkAbove5Call}/>
                        <p>{checkAbove5Fail}</p>
                    </label>
                </div>
                
                &nbsp;<button type="submit" disabled={!showErrorsOrNot}>Submit</button>
            </form>
        );
    }

    // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    checkAtCall =(indexParam) =>{
        const checkAt = indexParam.target.value;
        let checkAtFail = '';

        if(!checkAt.includes('@')) 
        {
            checkAtFail = '@ is needed to fulfill email';
        }

        this.setState({checkAt,checkAtFail}, this.showErrorsOrNotCall);
    };

    // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    showErrorsOrNotCall =() =>{
        const {checkAtFail,checkAbove5Fail,checkAt,checkAbove5} = this.state;

        const showErrorsOrNot = !checkAtFail && !checkAbove5Fail && checkAt && checkAbove5;

        this.setState({showErrorsOrNot});
    };

    // <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    checkAbove5Call =(indexParam) =>{
        const checkAbove5 = indexParam.target.value;
        let checkAbove5Fail = '';

        if(5 > checkAbove5.length) 
        {
            checkAbove5Fail = 'Minimum of 5 characters allowed';
        }

        this.setState({checkAbove5,checkAbove5Fail}, this.showErrorsOrNotCall);
    };
}

export default LoginForm;

  