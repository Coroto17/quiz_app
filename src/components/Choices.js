import React from "react";
import { Radio } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const Choices = (props) => {
  const { questionId, userAnswers } = props;

  return (
    <Radio.Group
      onChange={(e, qId) => props.handleChange(e, questionId)}
      value={userAnswers[questionId] ? userAnswers[questionId] : null}
    >
      {props.choices.map((choice, index) => (
        <Radio style={radioStyle} value={choice} key={index}>
          {choice}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default Choices;
