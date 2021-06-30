import { createMuiTheme } from '@material-ui/core';

export const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: '#AAF',
        },
      },
      MuiToolbar: {
        root: {
          backgroundColor: '#202838',
        },
      },
      MuiTableCell: {
        head: {
          backgroundColor: 'white',
        },
      },
      MuiTableFooter: {
        root: {
          '& .MuiToolbar-root': {
            backgroundColor: 'white',
          },
        },
      },
    },
  });
