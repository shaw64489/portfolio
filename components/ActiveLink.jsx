import React, { Component, Children } from 'react';
import { Link } from '../routes';
import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, ...props }) => {
  //gettin <a> element child of active link in header
  //only one child
  const child = Children.only(children);
  //get child class names
  let className = child.props.className || "";

  //compare props route with router path
  if (router.asPath === props.route && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;

  //props href
  //clone <a> element - return with additional props
  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
