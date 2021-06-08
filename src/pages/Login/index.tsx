import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { UserLayout } from "../../layouts/userLayout";

const Login: React.FC = (props: any) => {
  console.log(props);

  return (
    <>
      <UserLayout>
        <h1>登陆</h1>
        <LoginForm />
      </UserLayout>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

// const mapDispatchToProps = {
//   increment: createIncrementAction,
// };

export default connect(mapStateToProps)(Login);
