import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';

const QontoConnector = withStyles({
	alternativeLabel: {
		top: 10,
		left: 'calc(-50% + 26px)',
		right: 'calc(50% + 26px)',
	},
	active: {
		'& $line': {
			borderColor: '#2963FF',
		},
	},
	completed: {
		'& $line': {
			borderColor: '#2963FF',
		},
	},
	line: {
		borderColor: '#BBDEFB',
		borderTopWidth: 6,
		borderRadius: 1,
	},
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
	root: {
		color: '#BBDEFB',
		display: 'flex',
		height: 22,
		alignItems: 'center',
	},
	active: {
		color: '#2963FF',
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
	completed: {
		color: '#2963FF',
		zIndex: 1,
		fontSize: 18,
	},
});

function QontoStepIcon(props) {
	const classes = useQontoStepIconStyles();
	const { active, completed } = props;

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
			})}
		>
			{completed ? (
				<Icon
					style={{
						fontSize: 40,
						color: '#2963FF',
					}}
				>
					check
				</Icon>
			) : (
				<div className={classes.circle} />
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return [
		'Giỏ hàng',
		'Thông tin thanh toán',
		'Chọn phương thức thanh toán',
		'Kiểm tra',
		'Hoàn tất',
	];
}

export default function CustomizedSteppers({ activeStep }) {
	const classes = useStyles();
	const steps = getSteps();
	return (
		<div className={classes.root} style={{ backgroundColor: '#F4FAFE' }}>
			<Stepper
				style={{ backgroundColor: '#F4FAFE' }}
				alternativeLabel
				activeStep={activeStep}
				connector={<QontoConnector />}
			>
				{steps.map((label, idx) => (
					<Step key={label}>
						<StepLabel StepIconComponent={QontoStepIcon}>
							<p
								style={{
									color: idx <= activeStep ? '#2963FF' : '#BBDEFB',
								}}
							>
								{label}
							</p>
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
