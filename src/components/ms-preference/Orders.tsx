import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Theme, createStyles } from "@material-ui/core";
import PaginationList from "../utils/PaiginationList";

import OrderInterface from "../../interfaces/OrderInterface";

const styles = (theme: Theme) => createStyles({

});

type MyState = {

};


type MyProps = {
  classes: any,
  theme: any,
  fetchUserOrders: any,
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
    const { totalPages, page, perPage, orderBy, info, fetchUserOrders } = this.props;
    console.log(totalPages);
    return (
      <div>
        {info.map((item, index) => <div key={index}>
          {item.id}
        </div>)}
        <PaginationList count={totalPages} onPageChanged={fetchUserOrders} initialPage={page}/>

      </div>
    )
  }

}

export default withStyles(styles, { withTheme: true })(Orders);