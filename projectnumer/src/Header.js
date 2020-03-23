import React, { Component } from 'react';
import './css/bootstrap.css';

class Header extends Component{
    render() {
          return (
            <body>
    <div class="header">
        <div class="container">
            <nav class="navbar navbar-inverse" role="navigation">
                <div class="navbar-header">
                    <button type="button" id="nav-toggle" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="/" class="navbar-brand scroll-top"><em>N</em>umerical</a>
                </div>
               
                <div id="main-nav" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        {/* <li><a href="#" class="scroll-top">Home</a></li>
                        <li><a href="#" class="scroll-link" data-id="about">About Us</a></li>
                        <li><a href="#" class="scroll-link" data-id="portfolio">Portfolio</a></li>
                        <li><a href="#" class="scroll-link" data-id="blog">Blog</a></li>
                        <li><a href="#" class="scroll-link" data-id="contact-us">Contact Us</a></li> */}
                    </ul>
                </div>
              
            </nav>
           
        </div>
      
    </div>
   
   </body> 

          );
        }

}

export default Header;