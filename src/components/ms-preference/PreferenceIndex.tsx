import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import LocalShippingRoundedIcon from "@material-ui/icons/LocalShippingRounded";
import SecurityRoundedIcon from "@material-ui/icons/SecurityRounded";
import ReceiptIcon from "@material-ui/icons/ReceiptRounded";
import PaymentIcon from "@material-ui/icons/PaymentRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import ClassRoundedIcon from "@material-ui/icons/ClassRounded";
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import CatIcon from "../icons/Cat";

const styles = (theme: Theme) =>
  createStyles({
    warningText: {
      color: "#a9a9a9",
      marginLeft: theme.spacing(2)
    },
    warningIcon: {
      verticalAlign: "middle"
    },
    container: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
      // marginLeft: theme.spacing(50),
      // marginRight: theme.spacing(50)
    },
    preferencesContainer: {
      marginTop: theme.spacing(3)
    },
    primeIcon: {
      color: theme.palette.primary.main
    }
  });

type MyState = {
  expanded: boolean;
};

type MyProps = {
  classes: any;
  theme: any;
  warningText?: string;
  paddingTop?: number;
  paddingBottom?: number;
};

const renderPreferenceItem = (
  defaultStyle: any,
  classes: any,
  preferenceData: any
) => {
  const handleClick = (event: any) => {
    // console.log('123');
  };

  let icon: any = "";

  switch (preferenceData.icon.type) {
    case "tag": {
      icon = preferenceData.icon.color ? (
        <preferenceData.icon.component
          fontSize="large"
          className={classes.warningIcon}
          style={{ color: preferenceData.icon.color }}
        />
      ) : (
        <preferenceData.icon.component
          fontSize="large"
          color="primary"
          className={classes.warningIcon}
        />
      );
      break;
    }
    case "image": {
      icon = <preferenceData.icon.component color="#ff5000" />;
      break;
    }
    default:
      break;
  }

  return (
    <Button
      style={defaultStyle.emptyCartCaptionContainer}
      onClick={preferenceData.onClickHandler}
    >
      {icon}

      <Typography variant="caption" className={classes.warningText}>
        {preferenceData.name}
      </Typography>
    </Button>
  );
};

const PreferenceList = [
  {
    name: "Your Addresses",
    icon: {
      type: "tag",
      component: LocalShippingRoundedIcon
    },
    onClickHandler: () => {}
  },
  {
    name: "Login & security",
    icon: {
      type: "tag",
      component: SecurityRoundedIcon
    },
    onClickHandler: () => {}
  },
  {
    name: "Your Orders",
    icon: {
      type: "tag",
      component: ReceiptIcon
    },
    onClickHandler: () => {
      location.href = "/user/preference/orders";
    }
  },
  {
    name: "Payment Options",
    icon: {
      type: "tag",
      component: PaymentIcon
    },
    onClickHandler: () => {
      location.href = "/user/preference/payment-options";
    }
  },
  {
    name: "Prime Member",
    icon: {
      type: "image",
      component: CatIcon
    },
    onClickHandler: () => {}
  },
  {
    name: "Gift Cards",
    icon: {
      type: "tag",
      component: CardGiftcardRoundedIcon
    },
    onClickHandler: () => {}
  },
  {
    name: "Class Bookings",
    icon: {
      type: "tag",
      component: ClassRoundedIcon,
      color: "#2F8819"
    },
    onClickHandler: () => {
      location.href = "/user/preference/class-bookings";
    }
  },
  {
    name: "Income Analysis",
    icon: {
      type: "tag",
      component: MonetizationOnRoundedIcon,
      color: "#2F8819"
    },
    onClickHandler: () => {
      location.href = "/user/preference/teacher/income-analysis";
    }
  }
];

class PreferenceIndex extends React.Component<MyProps, MyState> {
  render() {
    const {
      theme,
      warningText,
      classes,
      paddingTop,
      paddingBottom
    } = this.props;

    let defaultStyle = {
      emptyCartCaptionContainer: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        // marginBottom: theme.spacing(3),
        // marginTop: theme.spacing(3),
        // FIXME:
        textAlign: "center" as "center",
        border: "2px solid #ededed",
        boxShadow: "3px 3px 20px -17px rgba(158,158,158,1)",
        borderRadius: "8px",
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
        <Grid container>
          <Grid item xs={1}>
            {/* <ProductCategorySideBarContainer></ProductCategorySideBarContainer> */}
          </Grid>

          <Grid item xs={10}>
            <div>
              <Typography
                variant="h5"
                gutterBottom
                className={classes.signInCaption}
              >
                Management
              </Typography>
              <Divider />
            </div>
            <Grid
              container
              spacing={5}
              className={classes.preferencesContainer}
            >
              {PreferenceList.map((item, index) => (
                <Grid item sm={12} md={4} xl={4} key={index}>
                  {renderPreferenceItem(defaultStyle, classes, item)}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PreferenceIndex);
