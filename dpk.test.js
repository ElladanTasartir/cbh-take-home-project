const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the correct hashed input when event is sent", () => {
    const event = "Something";

    const key = deterministicPartitionKey(event);
    const encryptedEvent = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

    expect(key).toEqual(encryptedEvent);
  });

  it("Returns the correct event when it's not a string", () => {
    const event = {
      something: 'event',
    };

    const key = deterministicPartitionKey(event);
    const encryptedEvent = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

    expect(key).toEqual(encryptedEvent);
  });
});
