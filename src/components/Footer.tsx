import * as React from "react";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
	container: {
		backgroundColor: '#401500',
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	footerText: {
		color: 'white',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	linkContainer: {
		textAlign: 'center',
		display: 'inline-flex',
		color: 'white',
		width: '100%'
	},
	linkItem: {
		marginRight: theme.spacing(2),
		transition: 'all 0.15s',
		color: 'white',
		textDecoration: 'none',
		'&:hover': {
			color: theme.palette.primary.main,
			transition: 'all 0.15s',
			textDecoration: 'underline'
		}
	}
});

type MyState = { 
};


type MyProps = {
  classes: any
};


class Footer extends React.Component<MyProps, MyState> {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
					<a href='/' className={classes.linkItem}>
						Condition of Use
					</a>
					<a href='/' className={classes.linkItem}>
						Privacy Notice
					</a>
					<a href='/' className={classes.linkItem}>
						Cookies
					</a>
        </Typography>
				<Typography variant="caption" gutterBottom align="center" className={classes.footerText}>
					© 2019, Max Studio
				</Typography>
			</div>
		)
	}
}

export default withStyles(styles)(Footer);