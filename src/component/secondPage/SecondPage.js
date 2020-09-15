import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createElem = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
        const item = {
          text: 'RandomText',
          num: `${i+1}`
        }
        items.push(item)
    }
    return items;   
};




export default function DenseTable({setState, state}) {


  const classes = useStyles();
  
  const [elements, setElements] = React.useState([]);
  const [selected, setSelected] = React.useState(state);
  
  useEffect(() => {
    setElements(createElem())
  }, []);

  useEffect(() => {
    setState(selected);
  });
  

  
  const numSelected = selected.length;
  const rowCount = elements.length;

 const handleSelectAllClick = (event) => {
   if (event.target.checked) {
     const newSelecteds = elements.map((elem) => elem.num);
    
     setSelected(newSelecteds);
     
     return;
   }
   setSelected([])
 };


 const handleClick = (event, text) => {
  const selectedIndex = selected.indexOf(text);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, text);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  setSelected(newSelected);
  };

  const isSelected = (text) => {
  return selected.indexOf(text) !== -1;
  }


  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                    color="primary"
                  />
                  id
              </TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {
                   elements.map((item, id) => {
                    const {text, num} = item;
                    const isItemSelected = isSelected(num);
                    const labelId = `enhanced-table-checkbox-${id}`;
                      return (
                          <TableRow 
                            hover
                            onClick={(event) => handleClick(event, num)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={id+1}
                            selected={isItemSelected}
                            >
                              <TableCell>
                                  <Checkbox
                                      checked={isItemSelected}
                                      color="primary"
                                      inputProps={{ "aria-labelledby": labelId }}
                                      /> 
                                  {id+1}
                              </TableCell>
                              <TableCell
                               id={labelId}>
                                {text}
                              </TableCell>
                          </TableRow>
                      )
                  })
              }
          </TableBody>
        </Table>
      </TableContainer>
    );
 
}

