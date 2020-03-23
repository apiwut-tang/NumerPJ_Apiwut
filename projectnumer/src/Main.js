import React, { Component } from 'react';
import Header from './Header';
import './common.css';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import logo1 from './img/logo_menu_01.png';
import logo2 from './img/logo_menu_02.png';
import logo3 from './img/logo_menu_03.png';
import logo4 from './img/logo_menu_04.png';
import logo5 from './img/formula.png';
import logo6 from './img/logo_menu_05.png';


const menu = [
  { name: "Bisection Method", link: "/bisection" ,logo:logo1 ,description : "การแบ่งครึ่งช่วง (Bisection Method) คือการแบ่งออกเป็นสองส่วนเท่ากันในคณิตศาสตร์เป็นวิธีการหารากที่ซ้ำๆ การแบ่งออกเป็นสองส่วนเท่ากัน"},
  { name: "False Position", link: "/falsemethod",logo:logo2 ,description: "False-Position Method สามารถกล่าวได้ว่าเป็นการทำ Linear Interpolation คือ ใช้เส้นตรงเป็นฟังก์ชั่น โดยประมาณของฟังก์ชั่นจริงในช่วงระหว่าง xl และ xu ของคำตอบ" },
  { name: "Newton Raphson", link: "/newton",logo:logo3 ,description:"จัดรูป X อยู่ใน g(x) และย้ายสมการอีกข้างไปไว้อีกด้าน เผื่อให้อีกด้านเหลือแค่ x เดียว แล้วหาค่า xi+1 เทียงกับ xi ไปเรื่อยๆจนกว่าจะได้ค่า error ที่น้อยสุด" },
  { name: "One Point", link: "/onepoint" ,logo:logo4 ,description:"เป็นฟังก์ชันที่ใช้งานมากสุดในการหาค่าของสมการ อาศัยจุดตัดแกน x ของเส้นตรง ณ ความชัน ณ จุด (x,y)"},
  { name: "Secant Method", link: "/secant",logo:logo5 , description:"เหมาะกับการที่ f(x) มีความซับซ้อนเป็นอย่างมาก และหาอนุพันธ์อันดับที่หนึ่งของ f(x) ได้ยากจึงต้องมาใช้วิธีแทนวิธีของ Newton"},
  { name: "Interpolation Quadratic NDD", logo:logo6 ,link: "/InterpolationQuadraNDD",description:"ฟังก์ชั่น F(X) เพื่อใช้ประมาณค่าในช่วงกำลังสอง โดยใช้ข้อมูล 3 ตำแหน่ง X0 X1 และ X2"}
]


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      genre: "",
    };
  }
  changepage(link) {
    browserHistory.push(link);
  }

  render() {
    return (
      <div>
        <Header />

        <div class="parallax-content baner-content" id="home">
            <div class="container">
                <div class="text-content">
                    <h2><em>NUMERICAL</em> <span>METHODS</span> WEBSITE</h2>
                    <p>เว็บไซต์นี้จัดทำมาเพื่อเป็นส่วนหนึ่งในการเรียนการสอนวิชา Numerical Method รหัสวิชา 040613393 ของภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ ของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ ซึ่งมีวิธีการต่างจากวิชา Numberical Method อาทิ เช่น Bisection ,False Position,Newton Rhapson,One Point,Secant Method.
                    </p>
                    <p>จัดทำโดย นายอภิวุฒิ วิจิตรเตมีย์ 5904062636436</p>
                    <div class="primary-white-button">
                        <a href="/" class="scroll-link" data-id="about">Let's Start</a>
                    </div>
                </div>
            </div>
        </div>
        <section id="about" class="page-section">
        <div class="container">
            <div class="row">
              {
                menu.map(item=>(
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="service-item">
                        <div class="icon">
                            <img src={item.logo} alt=""></img>
                        </div>
                        <h4>{item.name}</h4>
                        <div class="line-dec"></div>
                        <p>{item.description}</p>
                        <div class="primary-blue-button">
                          <Link class="scroll-link" onClick={() => this.changepage(item.link)}>Continue Reading</Link>
                        </div>
                    </div>
                 </div> 
                 ))
              }  
            </div> 
          </div>     
        </section>
        {/* <div class="body">
          <ul class="ch-grid">
            {
              menu.map(item => (
                <li>
                  <Link onClick={() => this.changepage(item.link)}>
                    <div class="ch-item">
                      <div class="ch-info" >
                        <h3>{item.name}</h3>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div> */}
      </div>
      
      

    );
  }
}



export default Main;
