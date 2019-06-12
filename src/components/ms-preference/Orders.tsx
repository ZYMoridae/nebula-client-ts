import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Theme, createStyles } from "@material-ui/core";
import PaginationList from "../utils/PaiginationList";

import OrderInterface from "../../interfaces/OrderInterface";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

const styles = (theme: Theme) => createStyles({
  table: {
    // marginTop: theme.spacing(4)
  },
  root: {
    marginTop: theme.spacing(4)
  },
  isLoading: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9999
  },
  progressContainer: {
    width: '100%',
    textAlign: 'center'
  },
  progress: {

  }
});

type MyState = {

};


type MyProps = {
  classes: any,
  theme: any,
  fetchUserOrders: any,
  isFetchingUserOrders: boolean,
  totalPages: number,
  page: number,
  perPage: number,
  orderBy: string,
  info: Array<any>
};


const renderChildren = (item: OrderInterface) => {
  return (
    <div>
      {item.id}
    </div>
  )
}

class Orders extends React.Component<MyProps, MyState> {

  componentDidMount() {
    const { fetchUserOrders, page, perPage, orderBy } = this.props;
    // fetchUserOrders(page, perPage, orderBy);
  }


  render() {
    const { totalPages, page, perPage, orderBy, info, fetchUserOrders, classes, isFetchingUserOrders } = this.props;

    return (
      <div className={classes.root}>



        <Grid container spacing={0}>
          <Grid item xs={1} md={2} xl={2}>

          </Grid>
          <Grid item xs={10} md={8} xl={8}>

            <Typography variant="h6" gutterBottom>
              My Orders
            </Typography>
            
            {isFetchingUserOrders && <div className={classes.progressContainer}>
              <CircularProgress></CircularProgress>
            </div>}
            <div>

              {!isFetchingUserOrders && <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Booking Ref
                  </TableCell>
                    <TableCell align="right">Created At</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {info.map((row: any, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">
                        {row.createdAt}
                      </TableCell>
                      <TableCell align="right">
                        {row.orderStatus.name}
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>

              </Table>}



            </div>




          </Grid>
          <Grid item xs={1} md={2} xl={2}>

          </Grid>

        </Grid>


        {/* {info.map((item, index) => <div key={index}>
          {item.id}
        </div>)} */}
        <PaginationList count={totalPages} onPageChanged={fetchUserOrders} initialPage={page} />

      </div>
    )
  }

}

export default withStyles(styles, { withTheme: true })(Orders);