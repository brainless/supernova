import React from 'react';


export const Hero = ({ size = "", children }) => (
  <section className={`hero ${size}`}>
    <div className="hero-body">
      <div className="container">
        {children}
      </div>
    </div>
  </section>
);


export const Section = ({ size = "", children }) => (
  <section className={`section ${size}`}>
    <div className="container">
      { children }
    </div>
  </section>
);


export const Hx = ({ x = "3", titleClass = "title", children }) => {
  return React.createElement(`h${x}`, {className: `${titleClass} is-${x}`}, children);
}


export const Box = ({ title, message, children }) => {
  return (
    <div className="box">
      { title ? <Hx x="4" titleclassName="subtitle">{title}</Hx> : null }
      { message ? (
        <p>{message}</p>
      ) : null }
      { children }
    </div>
  );
}


export const DataTable = ({ thead, children }) => (
  <div className="table-container">
    <table className="table is-narrow is-fullwidth">
      { thead }
      { children }
    </table>
  </div>
);


export const Panel = ({ title, hasSearch, hasTabs, children }) => (
  <nav className="panel">
    <p className="panel-heading">
      { title }
    </p>
    { hasSearch ? (
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
    ) : null }
    { hasTabs ? (
      <p className="panel-tabs">
      </p>
    ) : null }
    { children }
  </nav>
);