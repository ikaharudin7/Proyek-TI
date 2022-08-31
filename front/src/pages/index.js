import React, { Component } from 'react';
import Link from '@mui/material/Link';
import './index.css'

  
class Home extends Component {
    render() {
      return (
        <div>
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">HOME</h1>
                <div className="column">
                  <h2 className="subheadings">subheading</h2>
                </div>
              </div>
                  <Link href = "/about" underline="hover" color = 'black' >
                    Learn more</Link>
              </div>
          </section>
        </div>
      );
    }

}
  
export default Home;