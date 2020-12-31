import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from '@material-ui/core';

class MyModal extends React.PureComponent {
	static instance = null;
	static show = (cb = () => {}, children = {}) => {
		cb();
		if (MyModal.instance) {
			console.log('Modal show ne');
			MyModal.instance.setState({ visible: false }, () => {
				MyModal.instance.setState({ visible: true, children });
			});
		}
	};
	static hide = (onHideCb = () => {}) => {
		if (MyModal.instance) {
			MyModal.instance.setState({ visible: false });
			console.log('modal hide ne');
			onHideCb();
		}
	};

	constructor(props) {
		super(props);
		MyModal.instance = this;
		this.state = {
			visible: false,
			children: {},
		};
	}
	render() {
		console.log('Modal render');

		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={MyModal?.instance?.state?.visible || false}
				onClose={() => MyModal.hide()}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				className="justify-content-center align-items-center d-flex"
			>
				<Fade in={MyModal?.instance?.state?.visible || false}>
					{MyModal?.instance?.state?.children ? (
						MyModal?.instance?.state?.children
					) : (
						<div>
							<h1>This not have children to render</h1>
						</div>
					)}
				</Fade>
			</Modal>
		);
	}
}
export default MyModal;
