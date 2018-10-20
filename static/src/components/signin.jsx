import React, { PureComponent } from "react";
import "../../sass/components/signin.css";

export default class singin extends PureComponent {
  
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container mt-70">
    <div className="row">
      <div className="col-md-6 sign-in-col bordered">
        <h2 className="col-heading">Sign in</h2>
        <form id="signinForm" action="//macys.app.tvpage.com/ambassadors/login" method="get">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" id="email" name="email"/>
          </div>
          <button type="submit" className="btn btn-default">SIGN IN</button>
        </form>
      </div>
      <div className="col-md-6 create-account-col">
      <h2 className="col-heading">Are you an Approved Ambassador?</h2>
        <p className="mb-18">
          If you have recently been approved, but have not yet created your account, please click below to get started.
        </p>
        <a href="//macys.app.tvpage.com/ambassadors/account/new"><input className="btn btn-default mb-18" type="button" value="GET STARTED"/></a>
        <p>If you would like to apply to become a Macy's Ambassador, please <a className="link" href="//macys.tvpage.com/">click here</a>.</p>
      </div>
    </div>
  </div>
  }

}