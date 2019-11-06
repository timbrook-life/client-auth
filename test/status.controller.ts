import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("StatusController", () => {
  it("health check", () =>
    request(Server)
      .get("/api/v1/status")
      .expect("Content-Type", /json/)
      .then(r => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("status")
          .equal("ok");
      }));
});
