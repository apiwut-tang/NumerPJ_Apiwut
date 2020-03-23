import React, { Component } from 'react';
import Header from '../Header';
import "./paint.css";
import { parse } from 'mathjs';

var arrtable = new Array();

class Interpolation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            n:"",
            n1:"",
            Xi: [],
            X:"",
            X0: "",
            X1: "",
            X2: "",
            result : "",
            fx:[],
            mode:"3"
        };
    }

    renderBody = (n) => {
        let arr = [];
        for(let i=0;i<n;i++){
            arr.push(
                <tr>
                    <td>
                        {i}
                    </td>
                    <td><input class="inputinterq" onChange={e => {
                            this.state.Xi[i] = e.target.value;
                        }}></input> </td>
                    <td>
                        <input class="textblack" type="text" onChange={e => {
                            this.state.fx[i] = e.target.value;
                        }}></input> 
                    </td>
                </tr>
            )
        }
        return arr;
    }

    Equationmode=(n)=>{
        if(n==0)
        {
            return(
                <div>
                <h5>x0</h5>
                <input class="inputinterq" required value={this.state.X0} onChange={e => this.setState({ X0: e.target.value })}></input>
                <h5>x1</h5>
                <input class="inputinterq"required value={this.state.Xl} onChange={e => this.setState({ X1: e.target.value})}></input> 
                <br></br>
                </div>
            );
        }else if(n==1){
            return(
                <div>
                <h5>x0</h5>
                <input class="inputinterq" required value={this.state.X0} onChange={e => this.setState({ X0: e.target.value })}></input>
                <h5>x1</h5>
                <input class="inputinterq"required value={this.state.Xl} onChange={e => this.setState({ X1: e.target.value})}></input> 
                <h5>x2</h5>
                <input class="inputinterq"required value={this.state.X2} onChange={e => this.setState({ X2: e.target.value })}></input>  
                <br></br>
                </div>
            );
        }
    }


    resultcal =()=>{
               
        var check = this.state.mode;
        var sum;
        let x0 = parseFloat(this.state.Xi[this.state.X0-1]);
        let x1 = parseFloat(this.state.Xi[this.state.X1-1]);
        let x2 = parseFloat(this.state.Xi[this.state.X2-1]);
        let fx0 = parseFloat(this.state.fx[this.state.X0-1]);
        let fx1 = parseFloat(this.state.fx[this.state.X1-1]);
        let fx2 = parseFloat(this.state.fx[this.state.X2-1]);
        let x = parseFloat(this.state.X);
        console.log(x0,x1,x2,fx0,fx1,fx2);

        let c0 = fx0 ;
	    let c1 = (fx1-fx0)/(x1-x0);
	    let c2 = (((fx2-fx1)/(x2-x1))-c1)/(x2-x0);
        console.log(c0);
        console.log(c1);
        console.log(c2);

        if(check==0)
        {
            sum = c0+(c1*(x-x0));
        }else if(check==1)
        {
            sum = c0+(c1*(x-x0))+(c2*(x-x0)*(x-x1));
        }

        this.setState({result: sum});
        console.log(sum);

    }    

    render(){
        return(

            <div>
                 <Header/>
                     <div class="body">
                            <h1 class="tx-exy">Interpolation Quadratic NDD</h1>
                            <h4>input n</h4>
                            <input class="textblack" type="text"required value={this.state.n1} onChange={e => this.setState({ n1: e.target.value })} />
                            <input class="textblack" type="submit" onClick={e => this.setState({ n: this.state.n1 })}/>
                            <h4>Find X</h4>
                            <input class="textblack" type="text" value="Submit" required value={this.state.X} onChange={e => this.setState({ X: e.target.value })}/>
                            <input class="textblack" type="submit" value="Submit" /> 
                            <table>
                                <tr>
                                    <th>No.</th>
                                    <th>X</th>
                                    <th>Input(Fx)</th>
                                </tr>
                                    {
                                        this.renderBody(this.state.n)
                                    }
                                
                            </table>
                            <div>
                            <select onChange={e => this.setState({ mode: e.target.value })}>
                                <option value="Equation">--Select Equation</option>
                                <option value="0">Linear</option>
                                <option value="1">Quadratic</option>
                                {
                                    console.log(this.state.mode)
                                }
                            </select>
                            </div>
                            <h4>จุดที่ต้องการหา</h4>
                            {
                                this.Equationmode(this.state.mode)
                            }
                            <input class="textblack" type="submit" value="Submit" onClick={this.resultcal} />
                            <h2>result of Interpolation Quadratic NDD is = {this.state.result} </h2>
                     </div>
                    
               </div>  

        ); 

    }


}


export default Interpolation;