import React, { Component } from 'react';
import './collection-page.css'
import CollectionGrid from '../components/Grid';
import PrimarySearchAppBar from '../components/SearchBar';
import View from '../components/Menus/View';
import SortBy from '../components/Menus/SortBy';
import { Box } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
  
class CollectionView extends Component {
    render() {
      return (
        <div>
          <section className="hero">
            <div className="hero-body">
              <div className="box">
                <PrimarySearchAppBar />
              </div>
              
              <div className = 'text-box'>showing 1 - 8
              
                <div className='flex-box'>
                  <View />
                  <SortBy />
                </div>
              </div>
              
              
              <div className="box">
                <CollectionGrid />
              </div>
            </div>
          </section>
        </div>
      );
    }

}
  
export default CollectionView;