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



export default function SimpleModal({selected}) {

   //Create Items
   const elements = createItem(15, 'item');


  //CreateRef for buttons and listItems in modal

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {

    if(el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }

    const buttons = [];
    const listItems = [];

    revealRefs.current.forEach(item => {
      if(item.nodeName === 'BUTTON') {
        buttons.push(item)
      } else if (item.nodeName === 'DIV') {
        listItems.push(item)
      }
    });

    changeSelectedColor(buttons);
    changeSelectedColor(listItems);
  };

//Change color for selected Elements
  const changeSelectedColor = (elem) => {
          selected.forEach(item => {  
              elem.forEach((e) => {
              if(item == +e.id) {
                e.style.backgroundColor = 'red';
              } else {
                return
              }
              });
          });
  }

  //scrollTo elements

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
      <DialogContent style={{ minHeight: "80px" }}>
      {elements.map((el, index) => {
          return (
            <Button
              key={`button${index}`}
              id={index+1}
              variant="contained"
              color="default"
              onClick={() => scrollTo(index)}
              ref={addToRefs}
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
              <Grid 
              ref={refs[index]}
              key={`element${index}`} 
              item xs={12}>
                <Paper
                   style={{ width: "100%", padding: 8 }}
                   ref={addToRefs}
                   id={index+1} >
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
