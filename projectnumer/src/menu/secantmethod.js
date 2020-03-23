import React, { Component } from 'react';
import Header from '../Header';
import "./paint.css";
import { parse } from 'mathjs';


var arrtable = new Array();

class secantmethod extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
          Eq: "x^3-6x-2",
          X0 : "2",
          X0minusone : "3",
          result : "",
          Iteration : "",
          menu:[]
        };
    }


    async componentDidMount(){
        const result = await this.getvalue();
        console.log(result);
        this.setState({menu:result});
    }
    
    addvalue(Eq,Xl,Xr,Xm,menu="secantmethod"){
        return new Promise((resolve,reject) => { 
             fetch('http://localhost:8080/add.php?menu='+menu+'&Eq='+Eq+'&Xl='+Xl+'&Xr='+Xr+'&Xm='+Xm)
            //fetch('http://192.168.99.100:8080/add.php?menu='+menu+'&Eq='+Eq+'&Xl='+Xl+'&Xr='+Xr+'&Xm='+Xm)
            .then((respnose) => respnose.json())
            .then((respnose) => {  
                resolve(respnose); 
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    getvalue(Eq,menu="secantmethod"){
        console.log(menu);
        return new Promise((resolve,reject) => { 
            fetch('http://localhost:8080/showtable.php?Eq='+Eq+'&menu='+menu)
            //fetch('http://192.168.99.100:8080/showtable.php?Eq='+Eq+'&menu='+menu)
            .then((respnose) => respnose.json())
            .then((respnose) => {  
                resolve(respnose); 
            })
            .catch((error) => {
                reject(error);
            });
        })
    }


    cleardata(){
        new Promise((resolve,reject) => {
            fetch('http://localhost:8080/delete.php?menu=secantmethod')
            //fetch('http://192.168.99.100:8080/delete.php?menu=secantmethod')
            .then((respnose) => respnose.json())
            .then((respnose) => {
                alert(respnose.msg);
                resolve(respnose);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    addEq=()=>{
        var check = 0;
        if(this.state.Eq == "")
        {
            alert("invalid input")
        }else
        {
            for(let i=0;i<this.state.menu.length;i++)
            {
                if(this.state.menu[i].Eq==this.state.Eq)
                {
                    check = 1;
                    alert("Value Duplicate")
                }
            }
            
            if(check==0)
            {
                var Eq = this.state.Eq;
                var xl = this.state.X0;
                var xr = this.state.X0minusone;
                var xm = 0;
                this.addvalue(Eq,xl,xr,xm);
                alert("add sucess")
            }
        }
    }




    Equet(EqForSloveFuntion,xvalueforSlove) {
   
        const NodeEqua = parse(EqForSloveFuntion); 
        
        const Equa = NodeEqua.compile();

        let scope = {
            x:xvalueforSlove
        }
        return Equa.eval(scope);
         
    }
    
    err(xmold, xmnew) {
        var er = ((Math.abs((xmnew - xmold) / xmnew)) * 100) / 100;
        return er;
    }

    resultcal=()=>{
        if(this.state.Eq == "" | this.state.X0 == "" | this.state.X0minusone == "" )
        {
            alert("invalid input")
        }else
        {
            var Eq = this.state.Eq;
            var xi_inmain = this.state.X0;
            var xi_minus1_inmain = this.state.X0minusone;
            
            var xi_plus1;
            var fpx_inmainValue;
            var errorValue = 1;
            var fixerrorValue = 0.0001;
            var i=0,j=0;
            if(this.state.Iteration=="")
            {
                while(errorValue>=fixerrorValue)
                {
                        xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));
                        errorValue=this.err(xi_plus1,xi_inmain);

                        console.log("Secant XiVALUE = ", xi_plus1);
                        console.log("This is errorvalue = ", errorValue);
                        console.log("This is fixvalueerror = ", fixerrorValue);
                        xi_inmain=xi_plus1;
                        arrtable.push({
                            Iteration: i,
                            X0: xi_plus1,
                            error: errorValue
                    })
                        i++;
                }
            }else{
                while(this.state.Iteration>j){
                        xi_plus1=xi_inmain-((this.Equet(Eq,xi_inmain)*(xi_minus1_inmain-xi_inmain))/(this.Equet(Eq,xi_minus1_inmain)-this.Equet(Eq,xi_inmain)));
                        errorValue=this.err(xi_plus1,xi_inmain);

                        console.log("Secant XiVALUE = ", xi_plus1);
                        console.log("This is errorvalue = ", errorValue);
                        console.log("This is fixvalueerror = ", fixerrorValue);
                        xi_inmain=xi_plus1;
                        arrtable.push({
                            Iteration: i,
                            X0: xi_plus1,
                            error: errorValue
                    })
                        i++;
                        j++
                }
            }    
            this.setState({result: xi_inmain})

        }


    }




    render(){
        return(
            <div>
                <Header/>
                <div class="body">
                            <h1 class="tx-exy">Secant Method</h1>
                            <h4>Menu Equation</h4>
                            <select class="select" onChange={e => this.setState({ Eq: e.target.value })}>
                            <option value="Equation">Select Equation</option>
                                {
                                    this.state.menu.map(item=>(
                                        <option>
                                            {item.Eq}
                                        </option>
                                    ))
                                }
                            </select>
                            <h4>Equation</h4>
                            <input class="textblack" type="text" placeholder="Enter Equation" required value={this.state.Eq} onChange={e => this.setState({ Eq: e.target.value })} />
                            <input class="textblack" type="submit" value="Add Data" onClick={this.addEq}/>
                            <h4>XilnMain</h4>
                            <input class="textblack" type="text" placeholder="X start" required value={this.state.X0} onChange={e => this.setState({ X0: e.target.value })} />
                            <h4>Xminusone</h4>
                            <input class="textblack" type="number" placeholder="Xminusone"required value={this.state.X0minusone} onChange={e => this.setState({ X0minusone: e.target.value })} />
                            <h4>Iteration</h4>
                            <input class="textblack" type="number" placeholder="Enter Iteration" required value={this.state.Iteration} onChange={e => this.setState({ Iteration: e.target.value })} />
                            <br></br>
                            <input class="textblack" type="submit" value="Submit" onClick={this.resultcal}/>
                            <h2 class="text1"> result of Secant  = {this.state.result}</h2>
                            
                            <br></br>
                            <input class="textblack" type="submit" value="Clear Value" onClick={this.cleardata} />

                            <table>
                                <tr>
                                    <th>Iteration</th>
                                    <th>X(i)</th>
                                    <th>ErrorValue</th>
                                  
                                </tr>
                                    {
                                        arrtable.map(item =>(
                                            <tr>
                                                <td>{item.Iteration}</td>
                                                <td>{item.X0}</td>
                                                <td>{item.error}</td>
                                            </tr>
                                        ))
                                    }
                                
                            </table>
                      
                     </div>
            </div>



        );

    }







}

export default secantmethod;