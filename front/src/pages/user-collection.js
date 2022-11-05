import React, { Component } from 'react';
import './collection-page.css'
import Collection from '../components/Collection';
import DialogSelect from '../components/AddItem';
import { Typography } from '@mui/material';
import Axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

  
function UserCollection() {

    const [cards, setCards] = React.useState({});
    const [load, setLoad] = React.useState(false);
    const [userid, setUserid] = React.useState();

    React.useEffect(() => {
      Axios.get("http://localhost:8080/login", { withCredentials: true})
      .then((response) => {       
        setUserid(response.data.user._id)
        console.log(userid)
    })    
    }, [userid]);

    React.useEffect(() => {
      fetch('http://localhost:8080/collections/view_collection/raymons', {
        method: "GET",
        headers: {"Access-Control-Allow-Origin": "*", "id":userid}
      })
        .then((res) => res.json())
        .then((cards) => setCards(cards))
        .then((load) => setLoad(true))
        .then((res) => console.log(window.location.pathname));
    }, [userid]);



    if (load == false) {
      return (
        <div>
          <section className="hero">
            <div className="hero-body">
              <div className="box">
                
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                  <CircularProgress />
                  {/* <Typography style={{textAlign: "center"}}>Loading... </Typography> */}
                </Box>
              </div>
            </div>
          </section>
        </div>
      );
    } 


    
      return (
        <div>
          <section className="hero">
            <div className="hero-body">
              <div className="box">
                {/* NEED TO FORMAT THJIS */}
                {Object.keys(cards).length === 0 
                  ? (
                      <>
                        <div>
                          <Typography style={{textAlign: "center"}}>You have not added any items to your Collection </Typography>
                        </div>
                        <div style={{textAlign: "center"}}>
                          <DialogSelect/>
                        </div>
                      </>
                    )
                  : <Collection cards = {cards}/>}
              </div>
            </div>
          </section>
        </div>
      );
    

}
  
export default UserCollection;