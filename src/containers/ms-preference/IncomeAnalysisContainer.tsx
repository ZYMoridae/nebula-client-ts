import { connect } from "react-redux";
import { fetchUserOrders } from "../../actions";
import IncomeAnalysis from "../../components/ms-preference/IncomeAnalysis";

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch
  };
};

const incomeAnalysisContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IncomeAnalysis);

export default incomeAnalysisContainer;
