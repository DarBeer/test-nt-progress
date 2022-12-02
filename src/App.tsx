import React from 'react';
import { Tabs, Tab } from "react-bootstrap";
import './App.css';
import {ArchiveComponent, TradingComponent} from "./components";

function App() {
  return (
    <div className="wrapper">
      <Tabs defaultActiveKey={"trading"}>
        <Tab tabClassName="tabs-link" title={"Trading"} eventKey="trading">
          <TradingComponent />
        </Tab>
        <Tab tabClassName="tabs-link" title="Archive" eventKey="archive">
          <ArchiveComponent />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
