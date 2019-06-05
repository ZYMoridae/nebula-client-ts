import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grow from '@material-ui/core/Grow';

const theme = createMuiTheme({
  // typography: {
  //   useNextVariants: true,
  // }
});

const classes = {
  commentBody: (deepIndex: number) => {
    return {
      borderLeft: deepIndex != 1 ? 'solid 1px' : '',
      borderColor: 'lightgrey',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: deepIndex != 1 ? theme.spacing(2) : theme.spacing(1),
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      marginLeft: deepIndex == 1 ? 0 : theme.spacing(1) * deepIndex
    }
  },
  commentUser: {
    marginBottom: theme.spacing(1)
  },
  commentUserImage: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  cBody: {
  }
};

type MyState = { 

};


type MyProps = {
  comment: any,
  deepIndex: number
};


class ProductComments extends React.Component<MyProps, MyState> {
  render() {
    const { comment, deepIndex } = this.props;

    return (
      <div>
        <div>

          <Typography variant="caption" gutterBottom style={classes.commentBody(deepIndex)}>
            <Typography variant="caption" gutterBottom style={classes.commentUser}>
              <AccountCircle fontSize="large" style={classes.commentUserImage} />
              {comment.user && comment.user.username}
            </Typography>
            <span style={classes.cBody}>
              {comment.body}
            </span>
          </Typography>
        </div>
        {comment.childrenComments && comment.childrenComments.map((comment1: any, index: number) =>
          <Grow in={true} key={index} timeout={index * 500}>
            <div>
              <div>
                <Typography variant="caption" gutterBottom style={classes.commentBody(deepIndex + 1)}>
                  <Typography variant="caption" gutterBottom style={classes.commentUser}>
                    <AccountCircle fontSize="large" style={classes.commentUserImage} />
                    {comment1.user && comment1.user.username}
                  </Typography>
                  <span style={classes.cBody}>
                    {comment1.body}
                  </span>
                </Typography>
              </div>
              {comment1.childrenComments && comment1.childrenComments.map((childComment: any, index2: number) => <ProductComments key={index2} comment={childComment} deepIndex={deepIndex + 2}></ProductComments>)}
            </div>
          </Grow>
        )}

      </div>
    )
  }
}

export default ProductComments;