import React, { Component } from 'react';
import Header from '../Header';
import "./paint.css";
import { parse } from 'mathjs';

var arrtable = new Array();

class falsemethod extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
          Eq: "", //(1/x)-43
          Xm:  0,
          Xl: "0.02",
          Xr: "0.03",
          Iteration : "",
          menu:[]
        };
    }

    async componentDidMount(){
        const result = await this.getvalue();
        console.log(result);
        this.setState({menu:result});
    }

    addvalue(Eq,Xl,Xr,Xm,menu="falsemethod"){
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

    cleardata(){
        new Promise((resolve,reject) => {
            fetch('http://localhost:8080/delete.php?menu=falsemethod')
           // fetch('http://192.168.99.100:8080/delete.php?menu=falsemethod')
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
                var xl = parseFloat(this.state.Xl);
                var xr = parseFloat(this.state.Xr);
                var xm = (xl  + xr) / 2;
                this.addvalue(Eq,xl,xr,xm);
                alert("add sucess")
            }
            
        } 
    }

    getvalue(Eq,menu="falsemethod"){
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


    resultcal =()=>{
        if(this.state.Xl == "" | this.state.Xr == "" | this.state.Eq == ""){
            alert("invalid input");
        }else{
            
            var xm;
            var Eq = this.state.Eq;
            var xl = parseFloat(this.state.Xl);
            var xr = parseFloat(this.state.Xr);
            xm = (xl  + xr) / 2;
            //console.log(xl,xr,xm,Eq);
            var xmoldinmain = xm;
            var fxl;
            var fxr;
            var fxm;
            var i = 0,j=0;
            var fixvalueerror = 0.00001;
            var errorvalue = 1;
            if(this.state.Iteration=="")
            {
                while (errorvalue >= fixvalueerror) {
                    //this.addvalue(xl,xr,xm);
                    fxl = this.Equet(Eq,xl);
                    fxr = this.Equet(Eq,xr);
                    if (i != 0) {
                        xm = xr - ((fxr * (xl - xr)) / (fxl - fxr));
                    }
                    fxm = this.Equet(Eq,xm);
                    if ((fxm * fxl) > 0) {
                        xl = xm;
                    }
                    else {
                        xr = xm;
                    }
                    if (i != 0) {
                        errorvalue = this.err(xmoldinmain, xm);
                        xmoldinmain = xm;
                    }
            
                    console.log("XMVALUE = ", xm);
                    console.log("I value =", i);
                    console.log("This is errorvalue = ", errorvalue);
                    console.log("This is fixvalueerror = ", fixvalueerror);
                    arrtable.push({
                        Iteration: i,
                        Xl: xl,
                        Xr: xr,
                        Xm: xm,
                        error: errorvalue
                    });
                    i++;
                }
            }else{
                while (this.state.Iteration>j){
                    //this.addvalue(xl,xr,xm);
                    fxl = this.Equet(Eq,xl);
                    fxr = this.Equet(Eq,xr);
                    if (i != 0) {
                        xm = xr - ((fxr * (xl - xr)) / (fxl - fxr));
                    }
                    fxm = this.Equet(Eq,xm);
                    if ((fxm * fxl) > 0) {
                        xl = xm;
                    }
                    else {
                        xr = xm;
                    }
                    if (i != 0) {
                        errorvalue = this.err(xmoldinmain, xm);
                        xmoldinmain = xm;
                    }
            
                    console.log("XMVALUE = ", xm);
                    console.log("I value =", i);
                    console.log("This is errorvalue = ", errorvalue);
                    console.log("This is fixvalueerror = ", fixvalueerror);
                    arrtable.push({
                        Iteration: i,
                        Xl: xl,
                        Xr: xr,
                        Xm: xm,
                        error: errorvalue
                    });
                    i++;
                    j++;
                }
            }    
            this.setState({Xm: xm})
        }
        
    }

    render(){

        return(

            <div>
                <Header/>
                <div class="body">
                    <h1 class="tx-exy">False Position Method</h1>
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
                            <h4>Xl</h4> 
                            <input class="textblack" type="number" placeholder="Enter Xl" required value={this.state.Xl} onChange={e => this.setState({ Xl: e.target.value })} />
                            <h4>Xr</h4>
                            <input class="textblack" type="number" placeholder="Enter Xr"required value={this.state.Xr} onChange={e => this.setState({ Xr: e.target.value })} />
                            <br></br>
                            <h4>Iteration</h4>
                            <input class="textblack" type="number" placeholder="Enter Iteration" required value={this.state.Iteration} onChange={e => this.setState({ Iteration: e.target.value })} />
                            <input class="textblack" type="submit" value="Submit" onClick={this.resultcal}/>
                            <h2 class="text1">XL = {this.state.Xl}        Xr = {this.state.Xr}</h2>
                            <h1 class="text1"> result of FalsePostion = {this.state.Xm}</h1>
                            <br></br>
                            <input class="textblack" type="submit" value="Clear Value" onClick={this.cleardata} />
                            

                            <table>
                                <tr>
                                    <th>Iteration</th>
                                    <th>XL</th>
                                    <th>XR</th>
                                    <th>XM</th>
                                    <th>Error</th>
                                </tr>
                                    {
                                        arrtable.map(item =>(
                                            <tr>
                                                <td>{item.Iteration}</td>
                                                <td>{item.Xl}</td>
                                                <td>{item.Xr}</td>
                                                <td>{item.Xm}</td>
                                                <td>{item.error}</td>
                                            </tr>
                                        ))
                                    }
                            </table>
                </div>
            </div>

        )

    }

}

export default falsemethod;