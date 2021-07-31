
import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="grid">
          {/* footer text */}
          <div className="start">
            <a href="/">WDDT's Offical Merchandise Store</a>
          </div>
          {/* copyright info */}
          <div className="end">
            <a href="https://github.com/zhenxiao-yu">Copyright © 2020 - 2021 ZhenXiao Yu</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;