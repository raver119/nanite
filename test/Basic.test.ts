import {expect, describe, test} from "@jest/globals"
import {publisher} from "../src";

describe("Basic", () => {
    test("single subscriber", () => {
        let cnt = 0
        const p = publisher<number>()
        p.subscribe((v) => cnt += v)

        p.publish(3)
        p.publish(5)
        expect(cnt).toBe(8)
    })

    test("few subscribers", () => {
        let cnt1 = 0
        let cnt2 = 0
        const p = publisher<number>()
        p.subscribe((v) => cnt1 += v)
        const s2 = p.subscribe((v) => cnt2 -= v)

        p.publish(3)
        p.publish(5)
        expect(cnt1).toBe(8)
        expect(cnt2).toBe(-8)

        // cnt2 should not be updated after unsubscribe
        s2.unsubscribe()
        p.publish(2)
        expect(cnt1).toBe(10)
        expect(cnt2).toBe(-8)
    })
})