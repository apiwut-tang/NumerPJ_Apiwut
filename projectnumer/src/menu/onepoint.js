import React, { Component } from 'react';
import Header from '../Header';
import "./paint.css";
import { parse } from 'mathjs';

var arrtable = new Array();

class onepoint extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
          Eq: "2-e^(x/4)",
          X0 : "0",
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

    addvalue(Eq,Xl,Xr,Xm,menu="onepoint"){
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

    getvalue(Eq,menu="onepoint"){
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
            fetch('http://localhost:8080/delete.php?menu=onepoint')
            //fetch('http://192.168.99.100:8080/delete.php?menu=onepoint')
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
                var xl = 0
                var xr = 0
                var xm = 0
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
    
    err(xiw1, xi) {
        var er = ((Math.abs((xiw1 - xi) / xiw1))*100)/100;
        return er;
    }

    resultcal=()=>{
        if(this.state.Eq == "" | this.state.X0 == "" )
        {
            alert("invalid input")
        }else
        {
            var Eq = this.state.Eq;
            var xiinmain = this.state.X0;
            var i=0,j=0;
            var xiw1inmain;
            var fixerrorValue = 0.00001;
            var errorValue=1;
            if(this.state.Iteration=="")
            {
                while(errorValue >= fixerrorValue)
                {
                    xiw1inmain = this.Equet(Eq,xiinmain);
                    errorValue= this.err(xiinmain,xiw1inmain);
                    console.log("xm = ", xiinmain);
                    console.log("error value = ", errorValue);
                    console.log("fixvalueerror = ", fixerrorValue);
                    xiinmain=xiw1inmain;
                    arrtable.push({
                        Iteration: i,
                        Xstart: xiinmain,
                        error: errorValue
                    })
                    i++;
                }  
            }else{
                while(this.state.Iteration>j)
                {
                    xiw1inmain = this.Equet(Eq,xiinmain);
                    errorValue= this.err(xiinmain,xiw1inmain);
                    console.log("xm = ", xiinmain);
                    console.log("error value = ", errorValue);
                    console.log("fixvalueerror = ", fixerrorValue);
                    xiinmain=xiw1inmain;
                    arrtable.push({
                        Iteration: i,
                        Xstart: xiinmain,
                        error: errorValue
                    })
                    i++;
                    j++;
                }  
            }     
            this.setState({result: xiinmain});

        }    


    }    

    

    render(){
           
        return(

            <div>
                <Header/>
                <div class="body">
                            <h1 class="tx-exy">ONE-POINT ITERATION Method</h1>
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
                            <input class="textblack" type="number" placeholder="X start"required value={this.state.X0} onChange={e => this.setState({ X0: e.target.value })} />
                            <br></br>
                            <h4>Iteration</h4>
                            <input class="textblack" type="number" placeholder="Enter Iteration" required value={this.state.Iteration} onChange={e => this.setState({ Iteration: e.target.value })} />
                            <input class="textblack" type="submit" value="Submit" onClick={this.resultcal}/>
                            <h2 class="text1"> result of One-Point  = {this.state.result}</h2>
                            
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

export default onepoint;