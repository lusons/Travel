import React from "react";
import { connect } from "react-redux";
// import { createIncrementAction } from "../../store/actions";

const Rigister: React.FC = (props: any) => {
  console.log(props);

  return (
    <>
      <h1>Rigister...{props.count}</h1>
      <button
        onClick={() => {
          props.dispatch({ type: "aaa" });
          props.dispatch({ type: "increment", payLoad: 1 });
        }}
      >
        incre
      </button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

// const mapDispatchToProps = {
//   increment: createIncrementAction,
// };

export default connect(mapStateToProps)(Rigister);
