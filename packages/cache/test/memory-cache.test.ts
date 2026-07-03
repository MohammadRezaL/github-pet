import { describe, expect, it } from "vitest";
import { MemoryCacheStore } from "../src/memory-cache";

describe("MemoryCacheStore", () => {
  it("stores and retrieves values", async () => {
    const cache = new MemoryCacheStore();

    await cache.set("hello", { value: 123 }, 60);

    const result = await cache.get<{ value: number }>("hello");

    expect(result?.value.value).toBe(123);
  });

  it("deletes values", async () => {
    const cache = new MemoryCacheStore();

    await cache.set("hello", { value: 123 }, 60);
    await cache.delete("hello");

    const result = await cache.get<{ value: number }>("hello");

    expect(result).toBeNull();
  });
});
