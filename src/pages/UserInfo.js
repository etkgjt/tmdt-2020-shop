import React, { useEffect, useState } from "react";

import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Box from "@material-ui/core/Box";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { getNumberWithDot } from "../untils/numberFormater";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  changePassword,
  getAllCoupon,
  getOrderHistorySync,
  updateUserInfo,
  updateUserInfoRedux,
} from "../redux/actions/userAction";
import { AlertModal, IndicatorModal, MyModal } from "../components";
import { useHelmetMeta } from "../untils/useHelmet";
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const TabPanel = (props) => {
  const { children, value, index } = props;

  return <Container className="pb-5 mb-4">{children}</Container>;
};
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const { loggedIn } = useSelector((state) => state.userReducer);
  return (
    <Container className="mt-5">
      {useHelmetMeta("this is userInfor", "userInfor")}
      {loggedIn ? (
        <Container className="my-5 pb-5">
          <Row className="my-5" />
          <Row className="my-5">
            <img
              src="https://plus24h.com/upload/images/t%E1%BA%A3i%20xu%E1%BB%91ng%20(1).png"
              style={{ width: 300, height: 300 }}
            />
          </Row>
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            className="border-bottom"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Hồ sơ" {...a11yProps(0)} />
              <Tab label="Lịch sử mua hàng" {...a11yProps(1)} />
              <Tab label="Đổi mật khẩu" {...a11yProps(2)} />
              <Tab label="Ví voucher" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
            className="p-0"
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <UserInfoTable data={userInfo} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <InvoiceHistory />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <ChangePassword data={userInfo} />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <CouponList />
            </TabPanel>
          </SwipeableViews>
        </Container>
      ) : (
        <h1 className="mt-5 pt-5 text-center w-100">
          Đăng nhập để sử dụng chức năng này
        </h1>
      )}
    </Container>
  );
}
const UserInfoTable = ({ data }) => {
  const dispatch = useDispatch();

  const [isChangable, setIsChangable] = useState(-1);
  const {
    address,
    id,
    first_name,
    last_name,
    username,
    phone_number,
    gender,
    token,
  } = data;

  console.log("data ", data);
  const [state, setState] = useState({
    ...data,
    password: "",
    confirm_password: "",
  });
  useEffect(
    () => setState({ ...data, password: "", confirm_password: "" }),
    [data]
  );
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      // console.log('value ne', value, 'state ne', state);
      if (value !== state?.password) {
        return false;
      }
      return true;
    });
    // return ValidatorForm.removeValidationRule('isPasswordMatch');
  });
  const _handleChange = (e) => {
    e.persist();
    console.log(e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const _handleSubmit = async () => {
    try {
      MyModal.show(() => {}, <IndicatorModal />);
      console.log("data", data);
      const sendData = JSON.stringify({
        UserName: state.email,
        Email: state.email,
        Firstname: state.first_name,
        Lastname: state.last_name,
        Address: state.address,
        Phone: state.phone_number,
        Gender: state.gender * 1,
        Role: 1,
        Id: id,
      });
      console.log("send Data", sendData);
      const res = await updateUserInfo(token, sendData, id);

      updateUserInfoRedux(dispatch, {
        address: state.address,
        id,
        first_name: state.first_name,
        last_name: state.last_name,
        username: state.email,
        phone_number: state.phone_number,
        gender: state.gender,
        token: token,
      });

      console.log("Update info success", res);
      MyModal.hide(() => {});
      MyModal.show(() => {},
      <AlertModal title="Chỉnh sửa thông tin thành công !" color="#458AFF" />);
      setTimeout(() => MyModal.hide(), 1000);
    } catch (err) {
      MyModal.hide(() => {});
      MyModal.show(() => {},
      <AlertModal title="Chỉnh sửa thông tin thất bại !" color="#458AFF" />);
      setTimeout(() => MyModal.hide(), 1000);
      console.log("Update info err", err);
    }
  };
  console.log("state ne", state);
  return (
    <Container fluid className="p-0">
      <Card
        className="mt-3 p-2 d-flex flex-row justify-content-center align-content-center"
        elevation={3}
      >
        <Col className="w-100 d-flex flex-column justify-content-center align-items-center py-5">
          <ValidatorForm className="mt-3 w-75" onSubmit={() => _handleSubmit()}>
            <TextValidator
              variant="outlined"
              className="mb-4 w-100"
              label="Họ"
              value={state?.first_name}
              name="first_name"
              validators={[
                "required",
                "minStringLength: 4",
                "maxStringLength: 20",
              ]}
              errorMessages={["This field is required"]}
              onChange={_handleChange}
            />

            <TextValidator
              variant="outlined"
              label="Tên"
              className="mb-4 w-100"
              value={state?.last_name}
              name="last_name"
              validators={[
                "required",
                "minStringLength: 4",
                "maxStringLength: 20",
              ]}
              errorMessages={["This field is required"]}
              onChange={_handleChange}
            />

            <TextValidator
              disable
              variant="outlined"
              label="Email"
              className="mb-4 w-100"
              value={state?.username}
            />

            <TextValidator
              variant="outlined"
              label="Địa chỉ"
              value={state?.address}
              className="mb-4 w-100"
              name="address"
              validators={["required", "minStringLength: 4"]}
              errorMessages={["This field is required"]}
              onChange={_handleChange}
            />

            {/* <TextValidator
							variant="outlined"
							label="Password"
							className="mb-4 w-100"
							type="password"
							value={state?.password}
							name="password"
							validators={['required', 'minStringLength: 6']}
							errorMessages={['This field is required']}
							onChange={_handleChange}
						/>
						<TextValidator
							variant="outlined"
							label="Confirm Password"
							className="mb-4 w-100"
							type="password"
							value={state?.confirm_password}
							name="confirm_password"
							validators={['required', 'isPasswordMatch']}
							errorMessages={[
								'This field is required',
								"password didn't match",
							]}
							onChange={_handleChange}
						/> */}

            <TextValidator
              variant="outlined"
              label="Số điện thoại"
              className="mb-4 w-100"
              value={state.phone_number}
              name="phone_number"
              validators={["required", "minStringLength: 10"]}
              errorMessages={["this field is required"]}
              onChange={_handleChange}
            />

            <Button
              type="submit"
              className="button-container-box-shadow"
              style={{
                marginTop: 10,
                color: "white",
                backgroundColor: "#4285f4",
                color: "white",
                borderWidth: 0,
                borderRadius: 25,
                width: "100%",
                height: 50,
              }}
            >
              Cập nhật
            </Button>
          </ValidatorForm>
        </Col>
      </Card>
    </Container>
  );
};
const ChangePassword = ({ data }) => {
  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });
  const {
    address,
    id,
    first_name,
    last_name,
    username,
    phone_number,
    gender,
    token,
  } = data;
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      // console.log('value ne', value, 'state ne', state);
      if (value !== state?.password) {
        return false;
      }
      return true;
    });
    // return ValidatorForm.removeValidationRule('isPasswordMatch');
  });
  const _handleChange = (e) => {
    e.persist();
    console.log(e.target.name, e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const _handleSubmit = async () => {
    try {
      MyModal.show(() => {}, <IndicatorModal />);

      const sendData = JSON.stringify({
        CustomerId: id,
        NewPassword: state.password,
      });
      console.log("send Data", sendData);
      const res = await changePassword(token, sendData, id);
      console.log("", res);
      MyModal.hide(() => {});
      MyModal.show(() => {},
      <AlertModal title="Đổi mật khẩu thành công !" color="#458AFF" />);
      setTimeout(() => MyModal.hide(), 1000);
    } catch (err) {
      console.log("Update info err", err);
      MyModal.hide(() => {});
      MyModal.show(() => {},
      <AlertModal title="Đổi mật khẩu thất bại !" color="#458AFF" />);
      setTimeout(() => MyModal.hide(), 1000);
    }
  };
  return (
    <Container fluid className="justify-content-center p-0">
      <Card
        className="mt-3 p-2 d-flex flex-row justify-content-center align-content-center"
        elevation={3}
      >
        <ValidatorForm
          className="p-3 w-75 justify-content-center"
          onSubmit={() => _handleSubmit()}
        >
          <TextValidator
            variant="outlined"
            label="Mật khẩu"
            className="mb-4 w-100"
            type="password"
            value={state?.password}
            name="password"
            validators={["required", "minStringLength: 6"]}
            errorMessages={["This field is required"]}
            onChange={_handleChange}
          />
          <TextValidator
            variant="outlined"
            label="Xác nhận mật khẩu"
            className="mb-4 w-100"
            type="password"
            value={state?.confirm_password}
            name="confirm_password"
            validators={["required", "isPasswordMatch"]}
            errorMessages={["This field is required", "password didn't match"]}
            onChange={_handleChange}
          />
          <Button
            type="submit"
            className="button-container-box-shadow"
            style={{
              marginTop: 10,
              color: "white",
              backgroundColor: "#4285f4",
              color: "white",
              borderWidth: 0,
              borderRadius: 25,
              width: "100%",
              height: 50,
            }}
          >
            Đổi mật khẩu
          </Button>
        </ValidatorForm>
      </Card>
    </Container>
  );
};
const InvoiceHistory = ({ userId }) => {
  const { history, userInfo } = useSelector((state) => state?.userReducer);
  const [state, setState] = useState(history);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state || !state.length) {
      dispatch(getOrderHistorySync(userInfo?.id, userInfo.token));
    }
  }, []);
  useEffect(() => {
    if (history && history.length) setState(history);
  }, [history]);
  return (
    <Container fluid className="p-0">
      <Card
        className="mt-3 p-2 d-flex flex-row justify-content-center align-content-center"
        elevation={3}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Ngày mua</TableCell>
              <TableCell>Thành tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state && state?.length ? (
              state?.map((v, i) => (
                <TableRow key={v?.id}>
                  <TableCell>#{i}</TableCell>
                  <TableCell>
                    {moment(v?.date).format("YYYY-MM-DD HH:mm:SS")}
                  </TableCell>
                  <TableCell>{getNumberWithDot(v?.total)}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        padding: 5,
                        backgroundColor:
                          v?.status?.id === 1
                            ? "#FFAF38"
                            : v?.status?.id === 2
                            ? "#FFAF38"
                            : v?.status?.id === 3
                            ? "#09B66E"
                            : "#FF3D57",
                        color: v?.status?.id * 1 <= 2 ? "black" : "white",
                        borderRadius: 5,
                        textAlign: "center",
                        display: "inline-block",
                        fontSize: 10,
                      }}
                    >
                      {v?.status?.value}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};
const CouponList = () => {
  const { coupon, userInfo } = useSelector((state) => state?.userReducer);
  const { id, token } = useSelector((state) => state.userReducer.userInfo);
  const [state, setState] = useState(coupon);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state || !state.length) {
      dispatch(getAllCoupon(userInfo?.id, token));
    }
  }, []);
  useEffect(() => {
    if (coupon && coupon.length) setState(coupon);
  }, [coupon]);
  console.log("state ne", state);
  return (
    <Container fluid className="p-0">
      <Card
        className="mt-3 p-2 d-flex flex-row justify-content-center align-content-center"
        elevation={3}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Ngày hết hạn</TableCell>
              <TableCell>Nội dung</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state && state?.length ? (
              state?.map((v, i) => (
                <TableRow key={v?.id}>
                  <TableCell>#{i}</TableCell>
                  <TableCell>{v?.code}</TableCell>
                  <TableCell>
                    {v?.endDate
                      ? moment(v?.endDate).format("YYYY-MM-DD HH:mm:SS")
                      : moment().format("YYYY-MM-DD HH:mm:SS")}
                  </TableCell>
                  <TableCell>{v?.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};
