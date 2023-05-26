import Web3 from "web3";

test("Web3 version", function () {
  expect(Web3.version).toEqual("1.10.0");
});
