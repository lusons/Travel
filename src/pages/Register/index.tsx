import React from "react";
import { connect } from "react-redux";
import RegisterForm from "./RegisterForm";
import { UserLayout } from "../../layouts/userLayout";

const Register: React.FC = (props: any) => {
  console.log(props);

  return (
    <>
      <UserLayout>
        <h1>注册</h1>
        <RegisterForm />
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

export default connect(mapStateToProps)(Register);
