import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import SecurityRoundedIcon from '@material-ui/icons/SecurityRounded';
import ReceiptIcon from '@material-ui/icons/ReceiptRounded';
import PaymentIcon from '@material-ui/icons/PaymentRounded';
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CatIcon from '../icons/Cat';

const styles = (theme: Theme) => createStyles({
  warningText: {
    color: '#a9a9a9',
    marginLeft: theme.spacing(2),
    
  },
  warningIcon: {
    verticalAlign: 'middle'
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(30),
    marginRight: theme.spacing(30)
  },
  preferencesContainer: {
    marginTop: theme.spacing(3)
  },
  primeIcon: {
    color: theme.palette.primary.main
  }
});

type MyState = {
  expanded: boolean
};


type MyProps = {
  classes: any,
  theme: any,
  warningText?: string,
  paddingTop?: number,
  paddingBottom?: number
};



const renderPreferenceItem = (defaultStyle: any, classes: any, preferenceData: any) => {
  const handleClick = (event: any) => {
    // console.log('123');
  }
  
  let icon: any = '';

  switch(preferenceData.icon.type) {
    case 'tag': {
      icon = <preferenceData.icon.component fontSize="large" color="primary" className={classes.warningIcon} />;
      break;
    }
    case 'image': {
      icon = <preferenceData.icon.component color="#ff5000"/>;
      break;
    }
    default:
      break;
  }



  return (
    <Button style={defaultStyle.emptyCartCaptionContainer} onClick={preferenceData.onClickHandler}>
      {icon}

      

      <Typography variant="caption" className={classes.warningText}>
        {preferenceData.name}

      </Typography>
    </Button>

    // <Paper style={defaultStyle.emptyCartCaptionContainer} onClick={handleClick}>


    // </Paper>
  )
}


const PreferenceList = [
  {
    "name": "Your Addresses",
    "icon": {
      "type": "tag",
      "component": LocalShippingRoundedIcon
    },
    "onClickHandler": () => {

    }
  },
  {
    "name": "Login & security",
    "icon": {
      "type": "tag",
      "component": SecurityRoundedIcon
    },
    "onClickHandler": () => {
      
    }
  },
  {
    "name": "Your Orders",
    "icon": {
      "type": "tag",
      "component": ReceiptIcon
    },
    "onClickHandler": () => {
      location.href = '/preference/orders';
    }
  },
  {
    "name": "Payment Options",
    "icon": {
      "type": "tag",
      "component": PaymentIcon
    },
    "onClickHandler": () => {
      
    }
  },
  {
    "name": "Prime",
    "icon": {
      "type": "image",
      "component": CatIcon
    },
    "onClickHandler": () => {
      
    }
  },
  {
    "name": "Gift Cards",
    "icon": {
      "type": "tag",
      "component": CardGiftcardRoundedIcon
    },
    "onClickHandler": () => {
      
    }
  }
];



class PreferenceIndex extends React.Component<MyProps, MyState> {
  render() {
    const { theme, warningText, classes, paddingTop, paddingBottom } = this.props;

    let defaultStyle = {
      emptyCartCaptionContainer: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        // marginBottom: theme.spacing(3),
        // marginTop: theme.spacing(3),
        // FIXME:
        textAlign: 'center' as 'center',
        border: '2px solid #ededed',
        boxShadow: '3px 3px 20px -17px rgba(158,158,158,1)',
        borderRadius: '8px',
        width: "100%"
        // backgroundColor: '#ededed',
        // '&:hover': {
        //   backgroundColor: '#3d3d3d'
        // }
      }
    };

    if (paddingTop != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingTop = paddingTop;
    }

    if (paddingBottom != undefined) {
      defaultStyle.emptyCartCaptionContainer.paddingBottom = paddingBottom;
    }

    return (
      <div className={classes.container}>
        <div>
          <Typography variant="h5" gutterBottom className={classes.signInCaption}>
            Management
          </Typography>
          <Divider />

        </div>
        <Grid container spacing={5} className={classes.preferencesContainer}>

          {PreferenceList.map((item, index) =>
            <Grid item xs={12} md={3} xl={3} key={index}>
              {renderPreferenceItem(defaultStyle, classes, item)}
            </Grid>)}
        </Grid>

      </div>



    )
  }
}

export default withStyles(styles, { withTheme: true })(PreferenceIndex);
