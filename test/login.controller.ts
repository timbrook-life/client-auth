import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("LoginController", () => {
  it("valid token", () =>
    request(Server)
      .post("/api/v1/login")
      .send({ token: "test" })
      .expect("Content-Type", /json/)
      .then(r => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("token")
          .equal("boop");
      }));

  it("rejects invalid tokens", done => {
    request(Server)
      .post("/api/v1/login")
      .send({ token: "invalid" })
      .expect(401, done);
  });
});
