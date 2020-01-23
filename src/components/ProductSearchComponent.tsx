import React, { Component } from "react";
import _ from "lodash";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import Cookies from "js-cookie";

const { Option } = Select;

class ProductSearchComponent extends React.Component {
  state: any = {
    data: [],
    value: [],
    fetching: false
  };

  fetchProduct = debounce((value: any) => {
    if (value === "") {
      this.setState({ data: [], fetching: false });
    } else {
      this.setState({ data: [], fetching: true });
      let token = Cookies.get("token");
      fetch(
        `/api/products?page=0&size=5&sort=&keyword=${value.toLowerCase()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(body => {
          const data = _.isNil(body._embedded)
            ? []
            : body._embedded.productList.map((item: any) => ({
                text: `${item.name}`,
                value: item.id
              }));
          this.setState({ data, fetching: false });
        });
    }
  }, 800);

  handleChange = (value: any) => {
    // console.log(value);
    window.location.href = `/shopping/products/${value.key}`;
    this.setState({
      value,
      data: [],
      fetching: false
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <div style={{ marginTop: "8px" }}>
        <Select
          showSearch
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          allowClear={true}
          style={{ width: "300px" }}
          labelInValue
          placeholder="Select product"
          onSearch={this.fetchProduct}
          onChange={this.handleChange}
          notFoundContent={fetching ? <Spin size="small" /> : null}
        >
          {data.map((d: any) => (
            <Option key={d.value}>{d.text}</Option>
          ))}
        </Select>
      </div>
    );
  }
}

export default ProductSearchComponent;
