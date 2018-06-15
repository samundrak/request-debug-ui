import React from 'react';
import { Card } from 'antd';

const cardCss = {
  fontWeight: 'bold',
  fontSize: '70px',
  position: 'relative',
  top: '37%',
  left: '40%',
  transform: 'translateX(-50%) translateY(-50%)',
};
const CountCard = ({ value, title }) => {
  return (
    <Card title={title}>
      <div className="bounceIn" key={value}>
        <span
          style={{
            ...cardCss,
          }}
        >
          {value}
        </span>
      </div>
    </Card>
  );
};
export default CountCard;
