import React, { useState } from "react";
import { Steps, Button, message } from 'antd';

const { Step } = Steps;

const Questions = ({questions}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style={{height: "100%"}}>
      <Steps progressDot current={current}>
        {questions.map((q, index) => (
          <Step key={index} />
        ))}
      </Steps>
      <div>{questions[current]}</div>
      <div>
        {current < questions.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === questions.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default Questions;