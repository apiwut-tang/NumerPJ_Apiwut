import React, { Component } from 'react';
import Header from '../Header';
import "./paint.css";
import { parse } from 'mathjs';
import { render } from '@testing-library/react';


var arrtable = new Array();

class Newton extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
          Eq: "",
          Diff : "",
          X0 : "",
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

    addvalue(Eq,Xl,Xr,Xm,menu="Newton"){
        Eq = Eq.replace('+', '%2B');
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

    getvalue(Eq,menu="Newton"){
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
                var Xl = 0;
                var Xr = 0;
                var Xm = 0;
                this.addvalue(Eq,Xl,Xr,Xm);
                alert("add sucess")
            }  
        }      
            
    }
    
    cleardata(){
        new Promise((resolve,reject) => {
             fetch('http://localhost:8080/delete.php?menu=Newton')
            //fetch('http://192.168.99.100:8080/delete.php?menu=Newton')
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
        if(this.state.Eq == "" | this.state.Diff == "" | this.state.X0 == "" )
        {
            alert("invalid input")
        }else
        {
            var Eq = this.state.Eq;
            var Diff = this.state.Diff;
            var xi_inmain = this.state.X0; //ค่าเริ่มต้นของ X(0)
            var xiplus1_inmain; //ค่าของ X(i+1)
            var fxi;
            var fxpi;
            var fixerrorValue = 0.0001;
            var errorValue = 1;
            var i=0,j=0;
            if(this.state.Iteration=="")
            {
                while(errorValue>=fixerrorValue)
                {
                    fxi=this.Equet(Eq,xi_inmain);
                    fxpi=this.Equet(Diff,xi_inmain);
                    xiplus1_inmain=xi_inmain-(fxi/fxpi); //เข้าสูตร นิวตัน
                    errorValue = this.err(xiplus1_inmain,xi_inmain);// ค่า error เอา Xiใหม่-xiเก่า / ใหม่

                    console.log("XMVALUE = ", xiplus1_inmain);
                    console.log("This is errorvalue = ", errorValue);
                    console.log("This is fixvalueerror = ", fixerrorValue);
                    xi_inmain=xiplus1_inmain;
                    arrtable.push({
                            Iteration: i,
                            Xstart: xiplus1_inmain,
                            error: errorValue
                    })
                    i++;
                }
            }else{
                while (this.state.Iteration>j){
                    fxi=this.Equet(Eq,xi_inmain);
                    fxpi=this.Equet(Diff,xi_inmain);
                    xiplus1_inmain=xi_inmain-(fxi/fxpi);
                    errorValue = this.err(xiplus1_inmain,xi_inmain);

                    console.log("XMVALUE = ", xiplus1_inmain);
                    console.log("This is errorvalue = ", errorValue);
                    console.log("This is fixvalueerror = ", fixerrorValue);
                    xi_inmain=xiplus1_inmain;
                    arrtable.push({
                            Iteration: i,
                            Xstart: xiplus1_inmain,
                            error: errorValue
                    })
                    i++;
                    j++;
                }    
            }    
             this.setState({result: xiplus1_inmain})

        }


    }




    render(){
        return(
            <div>
                <Header/>
                <div class="body">
                            <h1 class="tx-exy">NEWTON RHOPSON Method</h1>
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
                            
                            <h4>Equation Diff</h4>
                            <input class="textblack" type="text" placeholder="Enter Equation Diff" required value={this.state.Diff} onChange={e => this.setState({ Diff: e.target.value })} />
                            <h4>XilnMain</h4>
                            <input class="textblack" type="number" placeholder="X start"required value={this.state.X0} onChange={e => this.setState({ X0: e.target.value })} />
                            <h4>Iteration</h4>
                            <input class="textblack" type="number" placeholder="Enter Iteration" required value={this.state.Iteration} onChange={e => this.setState({ Iteration: e.target.value })} />
                            <br></br>
                            <input class="textblack" type="submit" value="Submit" onClick={this.resultcal}/>
                            <h2 class="text1"> result of Newton  = {this.state.result}</h2>
                            
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
                                                <td>{item.Xstart}</td>
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

export default Newton;