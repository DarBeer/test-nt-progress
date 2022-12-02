import React, {useCallback, useState} from "react";
import {Clock} from "../."
import {useTrading} from "../../providers";
import {Col, Container, Form, Row} from "react-bootstrap";
import {CurrenciesType} from "../../types";
import {Side} from "../../constants";
import {TradePanelComponent} from "./TradePanelComponent";

function Option({currencies, currentCurrencies}: {currentCurrencies: [CurrenciesType, CurrenciesType],
                                                  currencies: CurrenciesType[]}) {
  const foundIndexes: number[] = currentCurrencies.map(item => currencies.indexOf(item));
  return <option value={JSON.stringify(foundIndexes)}>{`${currentCurrencies[0].name}/${currentCurrencies[1].name}`}</option>
}

export function TradingComponent() {
  const { currencies, exchangeCurrency } = useTrading();
  const [currentIndexes, setCurrentIndexes] = useState<[number, number]>([0, 1]);

  const onChangeHandle = useCallback((value: string) => {
    setCurrentIndexes(JSON.parse(value) as [number, number]);
  }, []);

  const options = currencies.map((currency, key) => currencies.filter(item => item.name !== currency.name)
                                                                      .map((subCurrency, subKey) =>
                                                                        <React.Fragment key={`${key}-${subKey}`}>
                                                                          <Option currencies={currencies}
                                                                                  currentCurrencies={[currency,
                                                                                                      subCurrency]} />
                                                                        </React.Fragment>))
                            .flat();
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Clock />
        </Col>
        <Col xs={12}>
          <Form.Select className="trading__select"
                       onChange={ (event) => onChangeHandle(event.target.value) }>
            { options }
          </Form.Select>
        </Col>
        <Col xs={12}>
          <Row>
            <Col>
              <TradePanelComponent side={Side.BUY} exchangeCurrency={exchangeCurrency}
                                   currencies={[currencies[currentIndexes[0]], currencies[currentIndexes[1]]]} />
            </Col>
            <Col>
              <TradePanelComponent side={Side.SELL} exchangeCurrency={exchangeCurrency}
                                   currencies={[currencies[currentIndexes[0]], currencies[currentIndexes[1]]]} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}