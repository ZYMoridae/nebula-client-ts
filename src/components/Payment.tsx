import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import PaymentOrder from "./payment/PaymentOrder";
import AddressForm from "./payment/AddressForm";
import PaymentMethod from "./payment/PaymentMethod";
import { isMobile } from "react-device-detect";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme, createStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import Cookies from "js-cookie";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // width: '90%',
      marginTop: theme.spacing(5)
    },
    button: {
      marginRight: theme.spacing(1)
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    completed: {
      display: "inline-block"
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    stepControllerContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
      textAlign: "center"
    },
    // The bellow styles will apply to Payment Order page
    paymentOrderContainer: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(4)
    },
    textField: {},
    gridItem: {
      paddingTop: "0px !important",
      paddingBottom: "0px !important"
    },
    gridContainer: {
      marginBottom: theme.spacing(8),
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8)
    },
    paymentMethodContainer: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4)
    },
    paymentMethodInputContainer: {
      paddingRight: isMobile ? "0" : theme.spacing(8),
      marginTop: isMobile ? theme.spacing(2) : "0"
    },
    ccBlockMobile: {
      padding: "0 !important"
    },
    progress: {
      color: "white",
      marginRight: theme.spacing(1)
    }
  });

function getSteps() {
  return ["Confirm your order", "Your shipping address", "Finalise your order"];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return "Step 1: Select campaign settings...";
    case 1:
      return "Step 2: What is an ad group anyways?";
    case 2:
      return "Step 3: This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

type MyState = {
  activeStep: number;
  completed: any;
  skipped: any;
};

type MyProps = {
  dispatch: any;
  fetchActivateOrder: any;
  isPaymentProcessing: boolean;
  classes: any;
  shippingInfoFormData: any;
  orderId: number;
  createShippingInfo: any;
  creditCardInfo: any;
  redirectToPaymentPage: boolean;
  redirectOrderId: number;
  activateOrder: any;
};

class Payment extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    };
  }

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step: number) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step: number) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  totalSteps() {
    return getSteps().length;
  }

  /**
   * Render sub-components which controller by the step controller
   */
  renderSubComponent(props: any, activeStep: number, classes: any) {
    return (
      <div>
        {activeStep == 0 && <PaymentOrder {...props} classes={classes} />}
        {activeStep == 1 && <AddressForm {...props} classes={classes} />}
        {activeStep == 2 && <PaymentMethod {...props} classes={classes} />}
      </div>
    );
  }

  componentWillMount() {
    const { fetchActivateOrder, orderId } = this.props;

    fetchActivateOrder(orderId);
  }

  renderFinishButton(
    handleNext: any,
    classes: any,
    activeStep: number,
    steps: any,
    isPaymentProcessing: boolean
  ) {
    let buttonContent: any = "Next";

    if (isPaymentProcessing) {
      buttonContent = (
        <CircularProgress className={classes.progress} size={24} />
      );
    } else {
      if (activeStep === steps.length - 1) {
        buttonContent = "Finish";
      }
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
      >
        {buttonContent}
      </Button>
    );
  }

  render() {
    const {
      activateOrder,
      classes,
      shippingInfoFormData,
      orderId,
      createShippingInfo,
      creditCardInfo,
      isPaymentProcessing,
      redirectToPaymentPage
    } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    let cartItems = JSON.parse(Cookies.get("_pfc"));
    // const totalSteps = () => getSteps().length;

    const isStepOptional = (step: number) => {
      return false;
    };

    const handleSkip = () => {
      const { activeStep } = this.state;
      // if (!this.isStepOptional(activeStep)) {
      //   // You probably want to guard against something like this
      //   // it should never occur unless someone's actively trying to break something.
      //   throw new Error("You can't skip a step that isn't optional.");
      // }

      this.setState(state => {
        const skipped = new Set(state.skipped.values());
        skipped.add(activeStep);
        return {
          activeStep: state.activeStep + 1,
          skipped
        };
      });
    };

    const updateShippingInfo = () => {
      // Validate shipping info
      if (
        !shippingInfoFormData.firstname ||
        !shippingInfoFormData.lastname ||
        !shippingInfoFormData.email ||
        !shippingInfoFormData.telephone ||
        !shippingInfoFormData.postCode ||
        !shippingInfoFormData.address1 ||
        !shippingInfoFormData.address2
      ) {
        return;
      }

      // Validate credit card info
      if (
        !creditCardInfo.cardnumber ||
        !creditCardInfo.cardname ||
        !creditCardInfo.expiry ||
        !creditCardInfo.cvc
      ) {
        return;
      }

      let paymentPayload: any = {};

      paymentPayload.cardNumber = creditCardInfo.cardNumber;
      paymentPayload.name = creditCardInfo.cardname;
      paymentPayload.expiry = creditCardInfo.expiry;
      paymentPayload.cvv = creditCardInfo.cvc;

      console.log(this.props);
      createShippingInfo(
        orderId,
        shippingInfoFormData,
        {
          paymentType: "CCC",
          creditCard: paymentPayload
        },
        activateOrder.paymentToken
      );
    };

    const handleNext = () => {
      let activeStep;

      if (this.isLastStep()) {
        updateShippingInfo();
      } else {
        activeStep = this.state.activeStep + 1;
        this.setState({
          activeStep
        });
      }

      // if (this.isLastStep() && !this.allStepsCompleted()) {
      //   // It's the last step, but not all steps have been completed
      //   // find the first step that has been completed
      //   const steps = getSteps();
      //   activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
      // } else {

      // }
    };

    const handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1
      }));
    };

    const handleStep = (step: any) => () => {
      this.setState({
        activeStep: step
      });
    };

    const handleComplete = () => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const completed = new Set(this.state.completed);
      completed.add(this.state.activeStep);
      this.setState({
        completed
      });

      /**
       * Sigh... it would be much nicer to replace the following if conditional with
       * `if (!this.allStepsComplete())` however state is not set when we do this,
       * thus we have to resort to not being very DRY.
       */
      if (completed.size !== this.totalSteps() - this.skippedSteps()) {
        handleNext();
      }
    };

    const handleReset = () => {
      this.setState({
        activeStep: 0,
        completed: new Set(),
        skipped: new Set()
      });
    };

    return (
      <div>
        {redirectToPaymentPage ? (
          <Redirect to={`/payment/${orderId}/success`} />
        ) : (
          <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
              {steps.map((label, index) => {
                const props: any = {};
                const buttonProps: any = {};
                if (isStepOptional(index)) {
                  buttonProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (this.isStepSkipped(index)) {
                  props.completed = false;
                }
                return (
                  <Step key={label} {...props}>
                    <StepButton
                      onClick={handleStep(index)}
                      completed={this.isStepComplete(index)}
                      {...buttonProps}
                    >
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>

            <Grid container spacing={0}>
              <Grid item xs={1} md={2}></Grid>
              <Grid item xs={10} md={8}>
                {/* Rendering sub-components */}
                {this.renderSubComponent(
                  this.props,
                  this.state.activeStep,
                  classes
                )}

                <div className={classes.stepControllerContainer}>
                  {this.allStepsCompleted() ? (
                    <div>
                      <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
                      {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        {this.renderFinishButton(
                          handleNext,
                          classes,
                          activeStep,
                          steps,
                          isPaymentProcessing
                        )}

                        {isStepOptional(activeStep) &&
                          !this.state.completed.has(this.state.activeStep) && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleSkip}
                              className={classes.button}
                            >
                              Skip
                            </Button>
                          )}
                        {/* {activeStep !== steps.length &&
                      (this.state.completed.has(this.state.activeStep) ? (
                        <Typography variant="caption" className={classes.completed}>
                          Step {activeStep + 1} already completed
                  </Typography>
                      ) : (
                          <Button variant="contained" color="primary" onClick={this.handleComplete}>
                            {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                          </Button>
                        ))} */}
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={1} md={2}></Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Payment);
