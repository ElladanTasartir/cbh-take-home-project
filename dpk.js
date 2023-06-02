const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    candidate = 
      event.partitionKey || 
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  if (!candidate) {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  return candidate.length <= MAX_PARTITION_KEY_LENGTH ? candidate : crypto.createHash("sha3-512").update(candidate).digest("hex"); 
};