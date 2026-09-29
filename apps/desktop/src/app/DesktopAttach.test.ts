import { assert, describe, it } from "@effect/vitest";

import { isSupportedAttachedBackendUrl } from "./DesktopAttach.ts";

describe("DesktopAttach", () => {
  it("accepts a loopback server origin with an explicit port", () => {
    assert.isTrue(isSupportedAttachedBackendUrl(new URL("http://127.0.0.1:3773/")));
    assert.isTrue(isSupportedAttachedBackendUrl(new URL("http://[::1]:3773/")));
    assert.isTrue(isSupportedAttachedBackendUrl(new URL("http://localhost:3773/")));
  });

  it("rejects remote, credentialed, and path-bearing URLs", () => {
    for (const address of [
      "https://127.0.0.1:3773/",
      "http://127.0.0.1/",
      "http://192.168.1.20:3773/",
      "http://example.com:3773/",
      "http://name:secret@127.0.0.1:3773/",
      "http://127.0.0.1:3773/admin",
      "http://127.0.0.1:3773/?token=secret",
    ]) {
      assert.isFalse(isSupportedAttachedBackendUrl(new URL(address)), address);
    }
  });
});
