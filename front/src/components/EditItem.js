import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ComboBox from './ComboBox';
import TextField from '@mui/material/TextField';
import UploadButton from './UploadButton';
import { Typography } from '@mui/material';



export default function EditItem({card, handleClose, handleEditClose}) {

  const [item, setItem] = React.useState({img: card.img, date: card.date});


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test")
    console.log(item)
    
    fetch("http://localhost:8080/collections/collection_test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
      .then((res)=> res.json())
      .then(()=> {
        console.log(item);
        console.log(JSON.stringify(item));
        console.log("POST sent");
      })
  }; 

  const handleDelete = (event) => {
    // event.preventDefault();
    console.log(card)

    fetch("http://localhost:8080/collections/collection_delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(card),
      })
      .then((res)=> res.json())
      .then(()=> {
        console.log(card);
        console.log(JSON.stringify(card));
        console.log("DELETE sent");
        
      })
      handleClose();
      window.location.href="http://localhost:3000/collection-page";

  }

  return (
    <>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
          
        <Box component="form" sx={{ display: 'block', flexWrap: 'wrap', m: 1}} id = "editItem" >
          <div>
            <div style = {{textAlign: 'center'}}>
              <UploadButton item = {item} setItem = {setItem}/>
              <Typography>
                Select Image to Change
              </Typography>
            </div>
            <div>
              {/* <ComboBox item = {item} setItem = {setItem}/> */}
              <TextField
                autoFocus
                fullWidth
                required
                id="name"
                label="Name"
                defaultValue={card.name}
                margin='normal'
                onChange = {e => setItem({...item, name: e.target.value})}
              />
              <TextField
                multiline
                autoFocus
                fullWidth
                id="desc"
                label="Description"
                defaultValue={card.name}
                margin='normal'
                onChange = {e => setItem({...item, desc: e.target.value})}
              />
            </div>  
          </div>                
        </Box>
      </DialogContent>
      <div>

        <DialogActions sx = {{textAlignLast: "right", display: "block"}}>
          {/* deleteOne */}
          <Button onClick={() => {handleDelete();}} sx = {{float: 'left'}}>
            Delete
          </Button>
          <Button onClick={() => {handleClose(); setItem({img: null})}}>
            Cancel
          </Button>

          {/* updateOne */}
          <Button onClick={handleEditClose} type = "submit" form = "editItem" >
            Ok
          </Button>
        </DialogActions>
      </div>
      
    </>
  );
}
