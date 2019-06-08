import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircleRounded';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme: Theme) => createStyles({
  successText: {
    color: '#a9a9a9',
    marginLeft: theme.spacing(1),
    fontSize: '0.9em'
  },
  checkCircleIcon: {
    verticalAlign: 'middle',
    fontSize: '2.5em',
    color: '#00c851'
  },
  table: {
    marginTop: theme.spacing(4)
  }
});

type MyState = {

};


type MyProps = {
  classes: any,
  theme: any,
  orderId: number,
  order: any,
  fetchOrder: any
};

class PaymentSuccess extends React.Component<MyProps, MyState> {
  componentWillMount() {
    const { orderId, fetchOrder } = this.props;
    fetchOrder(orderId);
  }

  render() {
    const { theme, classes, order } = this.props;

    let defaultStyle = {
      emptyCartCaptionContainer: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(10),
        // FIXME:
        textAlign: 'center' as 'center'
      }
    };

    return (

      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={1} md={2} xl={2}>

        </Grid>
        <Grid item xs={10} md={8} xl={8}>
          <Paper style={defaultStyle.emptyCartCaptionContainer}>


            <CheckCircleIcon fontSize="large" color="primary" className={classes.checkCircleIcon} />

            <Typography variant="caption" gutterBottom className={classes.successText}>
              Payment Success!
            </Typography>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Product
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order && order.orderItems.map((row: any, index: number) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">
                      {row.product.price}
                    </TableCell>
                    <TableCell align="right">
                      {row.quantity}
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </Paper>

        </Grid>
        <Grid item xs={1} md={2} xl={2}>

        </Grid>
      </Grid>



    )
  }
}

export default withStyles(styles, { withTheme: true })(PaymentSuccess);
