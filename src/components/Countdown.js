import React from 'react';
import '../css/Countdown.css';

const Countdown = ({ countdown }) => {
  return (
    <div className="demo">
      <div className="demo__colored-blocks">
        <div className="demo__colored-blocks-rotater">
          <div className="demo__colored-block"></div>
          <div className="demo__colored-block"></div>
          <div className="demo__colored-block"></div>
        </div>
        <div className="demo__colored-blocks-inner"></div>
        <div className="demo__text">{countdown}</div>
      </div>
      <div className="demo__inner">
        <svg className="demo__numbers" viewBox="0 0 100 100">
          <defs>
            <path className="demo__num-path-1"/>
            <path className="demo__num-join-1-2" />
            <path className="demo__num-path-2"/>
            <path className="demo__num-join-2-3"/>
            <path className="demo__num-path-3" />
          </defs>
          <path
            className="demo__numbers-path"
          />
        </svg>
      </div>
    </div>
  );
};

export default Countdown;
