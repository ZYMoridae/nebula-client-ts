import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HeaderBarContainer from "../containers/HeaderBarContainer";
import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/LoginContainer";

import PrivateRoute from "./PrivateRoute";
import ProductsContainer from "../containers/ProductsContainer";
import ProductInfoContainer from "../containers/ProductInfoContainer";
import ShoppingCartContainer from "../containers/ShoppingCartContainer";
import PaymentContainer from "../containers/PaymentContainer";
import PaymentSuccessContainer from "../containers/PaymentSuccessContainer";
import PreferenceIndex from "../components/ms-preference/PreferenceIndex";
import OrdersContainer from "../containers/ms-preference/OrdersContainer";
import RegisterContainer from "../containers/RegisterContainer";

import PaymentOptionManagementContainer from "../containers/ms-preference/PaymentOptionManagementContainer";
import ClassBookingsContainer from "../containers/ms-preference/ClassBookingsContainer";
import IncomeAnalysisContainer from "../containers/ms-preference/IncomeAnalysisContainer";

import TeacherIndexContainer from "../containers/teacher/TeacherIndexContainer";
import TeacherInfoContainer from "../containers/teacher/TeacherInfoContainer";

import IndexContainer from "../containers/IndexContainer";

import Footer from "./Footer";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "../utils/Routes";
import Fade from "@material-ui/core/Fade";

import Utils from "../utils/Utils";
import BackgroundProcessContainer from "../containers/BackgroundProcessContainer";

const nebulaTheme = createMuiTheme({
  // typography: {
  //   useNextVariants: true,
  // },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#2b8eff"
      // footerDark: '#401500',
      // footerDark: '#1d1d1d'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00"
    }
    // error: will use the default color
  }
});

const Home = () => (
  <div>
    {/* <UserContainer></UserContainer> */}
    <HomeContainer></HomeContainer>
  </div>
);

const Login = () => (
  <div>
    <LoginContainer></LoginContainer>
  </div>
);

const Products = () => {
  let params = new URLSearchParams(window.location.search);
  let page = 1,
    perPage = 12,
    orderBy = "name",
    userPage = params.get("page"),
    userPerPage = params.get("perPage"),
    userOrderBy = params.get("orderBy");

  if (userPage != undefined) {
    page = parseInt(userPage);
  }

  if (userPerPage != undefined) {
    perPage = parseInt(userPerPage);
  }

  if (userOrderBy != undefined) {
    orderBy = userOrderBy;
  }

  return (
    <div>
      <ProductsContainer
        page={page}
        perPage={perPage}
        orderBy={orderBy}
      ></ProductsContainer>
    </div>
  );
};

const ProductInfo = ({ match }: { match: any }) => {
  return (
    <div>
      <ProductInfoContainer productId={match.params.id}></ProductInfoContainer>
    </div>
  );
};

const CartInfo = () => {
  return (
    <div>
      <ShoppingCartContainer></ShoppingCartContainer>
    </div>
  );
};

type TParams = { id: number };

const PaymentComponent = ({ match }: { match: any }) => {
  return (
    <div>
      <PaymentContainer orderId={match.params.orderId}></PaymentContainer>
    </div>
  );
};

const TeacherInfo = ({ match }: { match: any }) => {
  return (
    <div>
      <TeacherInfoContainer id={match.params.id}></TeacherInfoContainer>
    </div>
  );
};

const PaymentSuccessComponent = ({ match }: { match: any }) => {
  return (
    <div>
      <PaymentSuccessContainer
        orderId={match.params.orderId}
      ></PaymentSuccessContainer>
    </div>
  );
};

const PreferenceComponent = () => {
  return <PreferenceIndex />;
};

const PreferenceOrderContainer = () => {
  let paginationParams: any = Utils.extractPaginationParams(1, 10, "");
  return (
    <OrdersContainer
      page={paginationParams.page}
      perPage={paginationParams.perPage}
      orderBy={paginationParams.orderBy}
    ></OrdersContainer>
  );
};

const UserRegister = () => {
  return <RegisterContainer />;
};

const PaymentOptionManagement = () => {
  return <PaymentOptionManagementContainer />;
};

const ClassBookings = () => {
  return <ClassBookingsContainer />;
};

const IncomeAnalysis = () => {
  return <IncomeAnalysisContainer />;
};

const TeacherIndex = () => {
  return (
    <div>
      <TeacherIndexContainer
        {...Utils.getPaginationParameter({
          orderBy: "username"
        })}
      ></TeacherIndexContainer>
    </div>
  );
};

class App extends React.Component {
  isShowHeaderAndFooter() {
    let isShow = true;

    if (location.pathname == Routes.USER.LOGIN) {
      isShow = isShow && false;
    }

    if (location.pathname == "/user/new") {
      isShow = isShow && false;
    }

    if (location.pathname == "/user/register") {
      isShow = isShow && false;
    }

    return isShow;
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={nebulaTheme}>
          <div>
            {Utils.isUserLogin() && <BackgroundProcessContainer />}
            {this.isShowHeaderAndFooter() && (
              <HeaderBarContainer></HeaderBarContainer>
            )}

            <Fade in={true} timeout={1200}>
              <div>
                <Switch>
                  <Route exact path="/" component={IndexContainer} />
                  <Route exact path="/store" component={Home} />
                  <Route exact path="/products" component={Products} />
                  <Route exact path="/products/:id" component={ProductInfo} />
                  <PrivateRoute exact path="/cart" component={CartInfo} />
                  <PrivateRoute
                    exact
                    path="/payment/:orderId"
                    component={PaymentComponent}
                  />
                  <PrivateRoute
                    exact
                    path="/payment/:orderId/success"
                    component={PaymentSuccessComponent}
                  />
                  <PrivateRoute
                    exact
                    path="/preference"
                    component={PreferenceComponent}
                  />
                  <PrivateRoute
                    exact
                    path="/preference/orders"
                    component={PreferenceOrderContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/preference/payment-options"
                    component={PaymentOptionManagement}
                  />
                  <PrivateRoute
                    exact
                    path="/preference/class-bookings"
                    component={ClassBookings}
                  />
                  <PrivateRoute
                    exact
                    path="/preference/teacher/income-analysis"
                    component={IncomeAnalysis}
                  />
                  <PrivateRoute
                    exact
                    path="/teachers/:id"
                    component={TeacherInfo}
                  />
                  <PrivateRoute
                    exact
                    path="/teachers"
                    component={TeacherIndex}
                  />

                  <Route path="/user/login" component={Login} />
                  <Route path="/user/register" component={UserRegister} />
                  <Redirect to="/" />
                </Switch>
              </div>
            </Fade>

            {this.isShowHeaderAndFooter() && <Footer></Footer>}
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
