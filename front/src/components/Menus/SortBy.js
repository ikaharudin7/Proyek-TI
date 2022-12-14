import * as React from 'react';
import { createTheme,styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';


const customTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(233, 233, 233);',
        },
    },
});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    
    borderRadius: 6,
    // marginTop: theme.spacing(1),
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function SortBy({cards, setFilteredCards}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredCardsString = JSON.stringify(cards);


  const handleZA = () => {
    cards.sort((a, b) => {
      return (a.name.toUpperCase() > b.name.toUpperCase()) ? -1 : 1;
    })

  }

  const handleAZ = () => {
    cards.sort((a, b) => {
      return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1;
    })
  
    
  }

  const handleOld = () => {
    cards.sort((a, b) => {
      return (dayjs(a.date).diff(dayjs(b.date)) < 0) ? 1 : -1;
    })

  }

  const handleNew = () => {
    cards.sort((a, b) => {
      return (dayjs(a.date).diff(dayjs(b.date)) > 0) ? 1 : -1;
    })

    
  }
  

  React.useEffect(() => {
      
    setFilteredCards(JSON.parse(filteredCardsString))
    
  }, [filteredCardsString, setFilteredCards])


  return (
    <div style={{display: 'inline'}}>
      <Button theme = {customTheme}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        disableRipple
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx = {{borderRadius: 0}}
      >
        Sort By
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >

        <MenuItem onClick={() => {handleClose(); handleAZ();}} disableRipple>
          A-Z
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); handleZA();}} disableRipple>
          Z-A
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); handleOld();}} disableRipple>
          Oldest
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); handleNew();}} disableRipple>
          Newest
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

