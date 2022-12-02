import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {useTrading} from "../../providers/TraidingProvider";
import {HistoryItemComponent} from "./HistoryItemComponent";

export function ArchiveComponent() {
  const { exchangeHistory } = useTrading();
  return (
    <Container fluid>
      <Row>
        <Col hidden={exchangeHistory.length === 0}>
          <Table>
            <thead>
              <tr>
                <th>Side</th>
                <th>Price</th>
                <th>Instrument</th>
                <th>Volume</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {exchangeHistory.map((historyItem, index) => (
                <React.Fragment key={index}>
                  <HistoryItemComponent data={historyItem} />
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col hidden={exchangeHistory.length !== 0}>
          <h3 className="history__empty">Oops! Your history is empty...</h3>
        </Col>
      </Row>
    </Container>
  )
}