import React, {useState, useEffect, useRef} from 'react';
import createItem from '../../services/createItem';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Grid,
  List
} from "@material-ui/core";



export default function SimpleModal() {

  const [selected, setSelected] = useState([1, 2, 3, 4]);

  //Create Items
  const elements = createItem(5, 'item');

  const refs = elements.map(() => React.createRef());

  const scrollTo = (index) => {
    refs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };




  //Open Modal 
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>  
    <Button onClick={handleOpen}> Open Modal </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Scroll to element</DialogTitle>
      <DialogContent style={{ minHeight: "180px" }} >
      {elements.map((el, index) => {
          return (
            <Button
              key={`button${index}`}
              id={index+1}
              variant="contained"
              color="default"
              onClick={() => scrollTo(index)}
            >
              {index + 1}
            </Button>
          );
        })}
      </DialogContent>
      <DialogContent>
       <List> 
       {elements.map((element, index) => {
            return (
              <Grid ref={refs[index]} id={index+1} key={`element${index}`} item xs={12}>
                <Paper style={{ width: "100%", padding: 8 }}>
                  {element}
                </Paper>
              </Grid>
            );
          })}
       </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
  
}
