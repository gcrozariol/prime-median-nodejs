"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_zod = require("zod");
var app = (0, import_express.default)();
var port = 3e3;
function sieveOfEratosthenes(n) {
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i < n; i += p) {
        isPrime[i] = false;
      }
    }
  }
  const primes = [];
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }
  return primes;
}
function findMedianPrimes(n) {
  const primes = sieveOfEratosthenes(n);
  const len = primes.length;
  if (len === 0) return [];
  if (len % 2 === 1) {
    return [primes[Math.floor(len / 2)]];
  } else {
    return [primes[len / 2 - 1], primes[len / 2]];
  }
}
var nSchema = import_zod.z.number().int().gt(2);
app.get("/median-primes/:n", (req, res) => {
  const n = Number(req.params.n);
  const result = nSchema.safeParse(n);
  if (!result.success) {
    return res.status(400).json({
      error: "Invalid input, please provide an integer greater than 2"
    });
  }
  const medianPrimes = findMedianPrimes(n);
  res.json({ medianPrimes });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
