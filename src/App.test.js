import React from 'react';
import { render, fireEvent, cleanup, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

afterEach(() => {
  cleanup();
});

const renderApp = () => render(<App/>);

const TEST_IDS = {
  nameInputId: 'studentName',
  joiningDateId: 'joiningDate',
  addBtnId: 'addBtn',
  errorMsgId: 'errorMsg',
  residentsNameList: 'residentsNameList'
};

  let getByTestId;
  let txtInput;
  let dateInput;
  let addButton;
  let list;

  beforeEach(() => {
    const App = renderApp();
    getByTestId = App.getByTestId;
    txtInput = getByTestId(TEST_IDS.nameInputId);
    dateInput = getByTestId(TEST_IDS.joiningDateId);
    addButton = getByTestId(TEST_IDS.addBtnId);
    list = getByTestId(TEST_IDS.residentsNameList);
  });

  it('should add valid students in Residents list', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);
    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');

    fireEvent.change(txtInput, { target: { value: 'Dhilip' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);

    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');
    expect(list.children[1].textContent.toLowerCase()).toEqual('dhilip');
    window.localStorage.clear();
  });

  it('should add valid students without case sensitivity', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'aDaM' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);
    expect(list.children[0].textContent.toLowerCase()).toEqual('adam');
    window.localStorage.clear();
  });

  it('should clear the input fields after adding a new student', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);
    expect(txtInput.value).toEqual('');
    expect(dateInput.value).toEqual('');
    window.localStorage.clear();
  });

  it('should show error on trying to add a student who is not in the list', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Anderson' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);
    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual('Sorry, Anderson is not a verified student!');

    fireEvent.change(txtInput, { target: { value: 'dam' } });
    fireEvent.change(dateInput, { target: { value: '2019-10-10' } });
    fireEvent.click(addButton);
    error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, dam is not a verified student!`);
    window.localStorage.clear();
  });

  it('should show error on trying to add a student whose validity has expired', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Bonnie' } });
    fireEvent.change(dateInput, { target: { value: '2019-10-10' } });
    fireEvent.click(addButton);
    const error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Bonnie's validity has Expired!`);
    window.localStorage.clear();
  });

  it('should hold the correct list and error message after series of Students addition', () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);

    expect(list.children[0]).toHaveTextContent("Adam");

    fireEvent.change(txtInput, { target: { value: 'Dhilip' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);

    expect(list.children[0]).toHaveTextContent("Adam");
    expect(list.children[1]).toHaveTextContent("Dhilip");

    fireEvent.change(txtInput, { target: { value: 'Talisk' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-11' } });
    fireEvent.click(addButton);

    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Talisk's validity has Expired!`);

    fireEvent.change(txtInput, { target: { value: 'Talisk' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
    fireEvent.click(addButton);

    fireEvent.change(txtInput, { target: { value: 'Rock' } });
    fireEvent.change(dateInput, { target: { value: '2030-10-10' } });
    fireEvent.click(addButton);

    error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual(`Sorry, Rock is not a verified student!`);

    expect(list.children[0]).toHaveTextContent("Adam");
    expect(list.children[1]).toHaveTextContent("Dhilip");
    expect(list.children[2]).toHaveTextContent("Talisk");
    window.localStorage.clear();
  });

  it("Should display an error if student is already present in the residents list and clear the input fields", () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
    fireEvent.click(addButton);

    expect(list.children[0]).toHaveTextContent("Adam");
    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-11' } });
    fireEvent.click(addButton);
    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual("Sorry, Adam is already present in the residents list!");
    expect(txtInput.value).toEqual('');
    expect(dateInput.value).toEqual('');
    window.localStorage.clear();
  });

  it("Should display an error if either of the input field is empty", () => {
    window.localStorage.clear();
    fireEvent.change(txtInput, {target: {value: ''}});
    fireEvent.change(dateInput, { target: { value: '2020-10-11' } });
    fireEvent.click(addButton);

    let error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual("Please enter all the fields");

    fireEvent.change(txtInput, { target: { value: 'Adam' } });
    fireEvent.change(dateInput, { target: { value: '2020-10-11' } });
    fireEvent.click(addButton);

    fireEvent.change(txtInput, { target: { value: 'John' } });
    fireEvent.change(dateInput, { target: { value: '' } });
    fireEvent.click(addButton);

    error = getByTestId(TEST_IDS.errorMsgId);
    expect(error.textContent).toEqual("Please enter all the fields");
    window.localStorage.clear();
  })

  describe("Testing local storage", () => {
    test("list is added into local storage", () => {
      window.localStorage.clear();
      const data = [{name: "Adam"}, {name: "Dhilip"}]
      fireEvent.change(txtInput, { target: { value: 'Adam' } });
      fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
      fireEvent.click(addButton);

      fireEvent.change(txtInput, { target: { value: 'Talisk' } });
      fireEvent.change(dateInput, { target: { value: '2023-12-11' } });
      fireEvent.click(addButton);

      let error = getByTestId(TEST_IDS.errorMsgId);
      expect(error.textContent).toEqual(`Sorry, Talisk's validity has Expired!`);

      fireEvent.change(txtInput, { target: { value: 'Dhilip' } });
      fireEvent.change(dateInput, { target: { value: '2020-10-10' } });
      fireEvent.click(addButton);

      expect(list.children[0]).toHaveTextContent("Adam");
      expect(list.children[1]).toHaveTextContent("Dhilip");
      expect(localStorage.getItem("residents")).toEqual(JSON.stringify(data));
      expect(JSON.parse(localStorage.getItem("residents"))).toHaveLength(2);
    })

    test("Fetch data from local storage on reload", () => {
      let data = [{name: "Adam"}, {name: "Dhilip"}]
      expect(list.children).toHaveLength(2);
      expect(list.children[0]).toHaveTextContent("Adam");
      expect(list.children[1]).toHaveTextContent("Dhilip");
      expect(localStorage.getItem("residents")).toEqual(JSON.stringify(data));
      expect(JSON.parse(localStorage.getItem("residents"))).toHaveLength(2);

      fireEvent.change(txtInput, { target: { value: 'Talisk' } });
      fireEvent.change(dateInput, { target: { value: '2023-10-10' } });
      fireEvent.click(addButton);
      data = [{name: "Adam"}, {name: "Dhilip"}, {name: "Talisk"}]
      expect(list.children).toHaveLength(3);
      expect(localStorage.getItem("residents")).toEqual(JSON.stringify(data));
      expect(JSON.parse(localStorage.getItem("residents"))).toHaveLength(3);
      window.localStorage.clear();
    })

  })
