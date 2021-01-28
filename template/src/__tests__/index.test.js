import React from 'react';
import ReactDOM from "react-dom";
import { renderToDOM } from '../index';
// import App from '../App';
describe('root index component render to dom', () => {
  // const originalRender = ReactDOM.render;
  // const originalGetElement = global.document.getElementById;
  // beforeEach(() => {
  //   global.document.getElementById = () => true;
  //   ReactDOM.render = jest.fn();
  // });
  // afterAll(() => {
  //   global.document.getElementById = originalGetElement;
  //   ReactDOM.render = originalRender;
  // });
  ReactDOM.render = jest.fn();
  jest.mock("react-dom", () => ({ render: jest.fn() }));
  it("should call ReactDOM.render", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    renderToDOM();
    expect(ReactDOM.render).toBeCalled();
  });
})