import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '35px',
    padding: '0px'
  }
}));



export default function SimpleModal({selected}) {
  const classes = useStyles();

  const createItems = (count, text = '') => {
    const items = [];
    for (let i = 0; i < count; i++) {
        const item = <li key={`index ${i}`}>{text} {i+1}</li>;
        items.push(item)
    }
    return items;
}

   //Create Items
   const elements = createItems(50, 'item');


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
              if(+item === +e.id) {
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
    <Button 
    variant="contained"
    color="primary"
    onClick={handleOpen}
    > Open Modal </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Scroll to element</DialogTitle>
      <DialogContent style={{ minHeight: "100px" }}>
      {elements.map((el, index) => {
          return (
            <Button
              className={classes.root}
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
