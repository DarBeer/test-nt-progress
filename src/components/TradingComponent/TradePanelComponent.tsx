import React, {useCallback, useState} from "react";
import {Side} from "../../constants";
import {CurrenciesType} from "../../types";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";

type TradePanelComponentProps = {
  side: Side,
  currencies: [CurrenciesType, CurrenciesType],
  exchangeCurrency: (side: Side, instrument: string, volume: number, price: number) => void
}

export function TradePanelComponent({side, currencies, exchangeCurrency}: TradePanelComponentProps) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<number>(100);

  const price = Math.round((side === Side.BUY ? currencies[0].values.buy / currencies[1].values.sell
                                                 : currencies[0].values.sell / currencies[1].values.buy) * 10000) / 10000;

  const handleClose = useCallback(() => {
    setShow(false);
    setValue(100);
  }, []);
  const handleShow = useCallback(() => {
    setShow(true);
    setValue(100);
  }, []);

  const onExchangeHandle = useCallback(() => {
    exchangeCurrency(side, `${currencies[0].name}/${currencies[1].name}`, value, price);
    handleClose();
  }, [handleClose, exchangeCurrency, currencies, side, value, price]);

  const onInputChangeHandle = useCallback((currentValue: string) => {
    setValue(prevState => {
      try {
        return currentValue.length === 0 ? 0 : parseInt(currentValue)
      } catch (error) {
        console.warn(error);
      }
      return prevState;
    })
  }, [])

  return (
    <div className={`trading__panel ${side}`}>
      <Row onClick={handleShow}>
        <Col xs={12}>
          <h3>{side}</h3>
        </Col>
        <Col xs={12}>
          <h4>{price}</h4>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} dialogClassName='trading-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Make order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col xs={12}>
                <h3 className="trading-modal__title"><span className={side}>side</span> {price} {`${currencies[0].name}/${currencies[1].name}`}</h3>
              </Col>
              <Col xs={12}>
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={3}>
                      Volume
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control type="text" value={value} onChange={e => onInputChangeHandle(e.target.value)} />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={value <= 0} onClick={onExchangeHandle}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}