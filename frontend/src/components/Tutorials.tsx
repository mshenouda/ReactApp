import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';


//Material ui
import {
  Button, Table, TableBody,
  TableCell, TableHead, TableRow, Paper,
  TableContainer, Grid, ListItemIcon,
  ListItemButton, ListItemText, ListItem, Stack
} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddDialog from './AddItem';
import EditDialog from './EditItem';
import Add from '@mui/icons-material/Add';

// import { PlayArrowIcon, StopIcon, ReplayIcon } from '@mui/icons-material';

//Styling of Table Cell
// const StyledTableCell = withStyles((theme: Theme) => ({
//     head: {
//         fontSize: 18,
//         fontWeight: "bold",
//     },
//     body: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'left',
//         padding: '2px 2px 2px 2px',
//     },
// }))(TableCell);

// //Styling Table Row
// const StyledTableRow = withStyles((theme: Theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//         height: 20,
//     },
// }))(TableRow);

// const useStyles = makeStyles((theme: Theme) => createStyles({
//     paper: {
//         height: 400,
//         width: '100%',
//         overflow: 'auto',
//         margin: '0px 0px 0px 0px',
//     },
//     result: {
//         width: '300px',
//         color: 'black',
//     },

// }));

// const Styled = withStyles({
//     root: {
//         color: 'white',
//         fontSize: 20,
//         height: 50,
//         margin: '0px 10px 10px 0'
//     },
//     iconSizeLarge: {
//         color: 'white',
//     },
//     colorInherit: {
//         color: 'white',
//         backgroundColor: 'green',
//     },
//     focusVisible: {
//         backgroundColor: 'inherit',
//     },
// })(Button);

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }

  & .${classes.actions} > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  `,
);


const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

interface IData {
  readonly id: number,
  title: string,
  description: string,
  published: boolean
}

const HandleTutorials = () => {
  const [datas, setData] = useState<IData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  //const classes = useStyles();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showAll = (): void => {
    {
      fetch("http://localhost:8080/api/tutorials", {
        method: 'GET'
      })
        .then(res => res.json())
        .then(newData => setData((prev) => [...prev, ...newData]))
        .catch(err => console.log(err));
    }
  }

  function handleDelete(id: number) {
    fetch('http://localhost:8080/api/tutorials/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setTimeout(() => showAll, 250);
  }

  useEffect(() => showAll(), []);

  return (
    <>
      <ListItem key={"AddIcon"} disablePadding>
        <AddDialog />
      </ListItem>
      {openDialog && <AddDialog />}
      <Root sx={{ width: 500, maxWidth: '200%' }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th align="justify">ID</th>
              <th align="justify">Title</th>
              <th align="justify">Description</th>
              <th align="justify">Published</th>
              <th align="justify">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : datas
            ).map((row) => (
              <tr key={row.id}>
                <td style={{ width: 10, height: 20 }} align="justify">{row.id}</td>
                <td style={{ width: 50, height: 20 }} align="justify">{row.title} </td>
                <td style={{ width: 120, wordWrap: "break-word" }} align="justify">{row.description} </td>
                <td style={{ width: 20 }} align="justify">{row.published ? "Published" : "Not Published"} </td>
                <td style={{ width: 20 }}>
                  <Stack spacing={1} sx={{ padding: 5 }} direction="row">
                    <ListItemButton onClick={() => <EditDialog />} >
                      <ListItemIcon><EditNoteIcon /></ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={() => handleDelete(row.id)}>
                      <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                    </ListItemButton>
                  </Stack>
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 34 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={datas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </>
  );
};
export default HandleTutorials;

