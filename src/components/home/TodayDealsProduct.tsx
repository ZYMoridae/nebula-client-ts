import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Card from '@material-ui/core/Card';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import ShareIcon from "@material-ui/icons/Share";
import _ from "lodash";
import Utils from "../../utils/Utils";

import { Theme, createStyles } from "@material-ui/core";

import { Card } from "antd";

const { Meta } = Card;

const styles = (theme: Theme) =>
  createStyles({
    card: {
      // maxWidth: ,
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    actions: {
      display: "flex"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    priceCaption: {
      color: "#ff5000",
      margin: 0
    },
    productItemLink: {
      textDecoration: "none",
      transition: "all 0.3s",
      "&:hover": {
        color: "orange",
        transition: "all 0.3s"
      }
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    cardContent: {
      padding: "16px !important"
    }
  });

type MyState = {
  expanded: boolean;
};

type MyProps = {
  dispatch: any;
  product: any;
  classes: any;
  isFetching: boolean;
};

class TodayDealsProduct extends React.Component<MyProps, MyState> {
  componentWillMount() {
    this.setState({ expanded: false });
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes, product, isFetching } = this.props;

    return (
      <a href={`/products/${product.id}`} target="_blank">
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <img
              alt="example"
              src={Utils.getRandomProductImageUrl()}
              style={{ height: 130, objectFit: "cover" }}
            />
          }
          loading={isFetching}
        >
          <Meta
            title={_.capitalize(product.name)}
            description={product.description}
          />
        </Card>
      </a>
    );
  }
}

export default withStyles(styles)(TodayDealsProduct);
