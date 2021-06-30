import React, { Component, useContext } from 'react';
import OtpInput from 'react-otp-input';
import { DataContext } from '../../Context Api/ManageData';

export default class OtpField extends Component {
  static contextType = DataContext;
  state = { otp: '' };
  handleChange = otp => this.setState({ otp });

  render() {
    // const { otp, setOpt } = useContext(DataContext);
    const finalOtp = this.state.otp;
    localStorage.setItem('finalOtp', finalOtp);
    return (
      <OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        className='otpInput'
        numInputs={6}
        isInputNum={true}
      />
    );
  }
}
