import React, { useMemo } from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const Layout = (props) => {
  const user = useMemo(() => {
    return global.auth.getUser() || {};
  }, []);

  return (
    <div className="main">
      <Header user={user} />
      {props.children}
      <Footer/>
    </div>
  );
};

export default Layout;
