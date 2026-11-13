/* eslint-disable */
// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

const RenderTarget = {
  current: () => "preview",
  hasRestrictions: () => false,
  canvas: "canvas",
  export: "export",
  preview: "preview",
  thumbnail: "thumbnail",
};

import * as React from "react"
import { useEffect, useRef } from "react"
/** Tuning values. Stripped at publish; the tuned values are baked in here. */
const ADVANCED_DEFAULTS = {
    baseSpeed: 28,
    cloudSpeed: 10,
    farSpeed: 45,
    frontSpeed: 600,
    sunX: -2,
    sunY: 37,
    glowSize: 9,
    glowStrength: 70,
    haloStrength: 35,
    skyDeep: "#48243A",
    skyMid: "#983D4B",
    cloudColor: "#F5AA96",
    cloudShadow: "#48243A",
    farTop: "#9E404A",
    farBottom: "#C45559",
    farMinWidth: 3,
    farMaxWidth: 8,
    midTop: "#48243A",
    midBottom: "#7E3447",
    midMinWidth: 10,
    midMaxWidth: 18,
    gapChance: 40,
    windowColor: "#FFFAF5",
    windowWarm: "#F5AA96",
    windowDensity: 45,
    hazeColor: "#F27C67",
    hazeStrength: 85,
    reflection: 80,
    railColor: "#261D34",
    lampColor: "#111932",
    lampGlow: "#F27C67",
    lampSpacing: 90,
    lampX: 10,
    parallax: 50,
    seed: 7,
    grain: 0,
    vignette: 35,
    hover: 100,
}

// ── moved controls (builder) ──
/**
 * Controls moved in the builder: into Advanced, out of it, or into groups of
 * their own. The code reads each one where it was first written, so the props
 * are put back in that shape before anything reads them.
 */
const MOVED_CONTROLS: { into: Record<string, string>; out: Record<string, string> } = {"into":{},"out":{"hover":"advanced"}}
const GROUP_FALLBACKS: Record<string, any> = { advanced: ADVANCED_DEFAULTS }
function withMovedControls(props: any): any {
    const out = { ...props }
    for (const [k, g] of Object.entries(MOVED_CONTROLS.into)) out[k] = props?.[g]?.[k] ?? GROUP_FALLBACKS[g]?.[k]
    for (const [k, g] of Object.entries(MOVED_CONTROLS.out)) {
        if (out[k] !== undefined) out[g] = { ...(out[g] ?? {}), [k]: out[k] }
    }
    return out
}
// ── /moved controls ──

// Scene height in art pixels; everything below is laid out in these units (reference 400 px = 200 art px).
const ART_H = 200
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
const thr = (x: number, y: number) => (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const mod = (a: number, n: number) => ((a % n) + n) % n
const white = (a: number) => `rgba(255,255,255,${clamp(a, 0, 1)})`
// A press sends a ring of lights through the city: how long it lives (s) and how far it has run (art px).
const RIPPLE_LIFE = 1.8
const rippleRadius = (t: number) => 4 + t * ART_H * 2.2

type RGBA = [number, number, number, number]
const colorCache = new Map<string, RGBA>()
function parseColor(input: string | undefined, fallback = "#000000"): RGBA {
    const s = String(input || fallback).trim()
    const hit = colorCache.get(s)
    if (hit) return hit
    let out: RGBA = [0, 0, 0, 1]
    if (s[0] === "#") {
        let h = s.slice(1)
        if (h.length === 3 || h.length === 4)
            h = h
                .split("")
                .map((ch) => ch + ch)
                .join("")
        const n = parseInt(h.slice(0, 6), 16) || 0
        out = [(n >> 16) & 255, (n >> 8) & 255, n & 255, h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1]
    } else {
        const m = s.match(/rgba?\(([^)]+)\)/i)
        if (m) {
            const p = m[1]
                .split(/[\s,\/]+/)
                .filter(Boolean)
                .map(parseFloat)
            out = [p[0] || 0, p[1] || 0, p[2] || 0, p.length > 3 && !isNaN(p[3]) ? p[3] : 1]
        }
    }
    colorCache.set(s, out)
    return out
}
const mix = (a: RGBA, b: RGBA, t: number): RGBA => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
    a[3] + (b[3] - a[3]) * t,
]
const css = (c: RGBA, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${clamp(a * c[3], 0, 1)})`

function rngFrom(seed: number) {
    let a = seed >>> 0 || 1
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

type Buf = { w: number; h: number; d: Uint8ClampedArray; img: ImageData }
function makeBuf(w: number, h: number): Buf {
    const img = new ImageData(Math.max(1, w), Math.max(1, h))
    return { w: img.width, h: img.height, d: img.data, img }
}
function put(b: Buf, x: number, y: number, c: RGBA, a = 1) {
    y = Math.floor(y)
    if (y < 0 || y >= b.h) return
    x = mod(Math.floor(x), b.w)
    const i = (y * b.w + x) * 4
    b.d[i] = c[0]
    b.d[i + 1] = c[1]
    b.d[i + 2] = c[2]
    b.d[i + 3] = Math.round(255 * clamp(a * c[3], 0, 1))
}
function makeCanvas(w: number, h: number) {
    const c = document.createElement("canvas")
    c.width = Math.max(1, w)
    c.height = Math.max(1, h)
    return c
}
function toCanvas(b: Buf) {
    const c = makeCanvas(b.w, b.h)
    c.getContext("2d")!.putImageData(b.img, 0, 0)
    return c
}

type Scene = {
    key: string
    bw: number
    bh: number
    yBase: number
    sky: HTMLCanvasElement
    clouds: HTMLCanvasElement
    far: HTMLCanvasElement
    mid: HTMLCanvasElement
    farLit: HTMLCanvasElement
    midLit: HTMLCanvasElement
    tops: Int16Array
    midPhase: number
    sun: HTMLCanvasElement
    sunR: number
    sunG: number
    sunX: number
    sunY: number
    haze: HTMLCanvasElement
    reflect: HTMLCanvasElement
    reflectW: number
    lamp: HTMLCanvasElement
    vig: HTMLCanvasElement | null
}

function buildScene(key: string, bw: number, bh: number, p: any, adv: typeof ADVANCED_DEFAULTS): Scene {
    const yBase = bh - ART_H
    const seed = Math.round(adv.seed)
    const dens = clamp(adv.windowDensity, 0, 100) / 100
    const win = parseColor(adv.windowColor)
    const warm = parseColor(adv.windowWarm)
    const hot = parseColor(adv.hazeColor)
    const deep = parseColor(adv.skyDeep)
    const skyMid = parseColor(adv.skyMid)
    const sunCol = parseColor(p.sunColor, "#FFFAF5")
    const bg = parseColor(p.background, "#000000")

    // ── sky: dithered vertical gradient, anchored to the scene's bottom ──
    const top = parseColor(p.skyTop, "#261D34")
    const hor = parseColor(p.skyHorizon, "#E87366")
    const stops: [number, RGBA][] = [
        [0, top],
        [0.18, deep],
        [0.36, mix(deep, skyMid, 0.5)],
        [0.5, skyMid],
        [0.64, mix(skyMid, hor, 0.45)],
        [0.78, hor],
    ]
    const sb = makeBuf(bw, bh)
    for (let y = 0; y < bh; y++) {
        const t = (y - yBase) / ART_H
        let i = 0
        while (i < stops.length - 2 && t > stops[i + 1][0]) i++
        const [t0, c0] = stops[i]
        const [t1, c1] = stops[i + 1]
        const f = clamp((t - t0) / (t1 - t0), 0, 1)
        for (let x = 0; x < bw; x++) put(sb, x, y, f > thr(x, y) ? c1 : c0)
    }

    // ── clouds: streaky pixel cumulus, lit on their lower edges ──
    const cl = Math.max(480, bw + 40)
    const cb = makeBuf(cl, 64)
    {
        const rng = rngFrom(seed * 31 + 1)
        const light = parseColor(adv.cloudColor)
        const shade = parseColor(adv.cloudShadow)
        const midc = mix(shade, light, 0.55)
        const streaks: { x: number; y: number; len: number; th: number }[] = []
        const clusters = Math.max(3, Math.round(cl / 110))
        for (let c = 0; c < clusters; c++) {
            const cx = rng() * cl
            const cy = 10 + rng() * 32
            const n = 4 + Math.floor(rng() * 5)
            for (let k = 0; k < n; k++)
                streaks.push({
                    x: cx + (rng() - 0.5) * 90,
                    y: Math.round(cy + (rng() - 0.5) * 18),
                    len: 12 + rng() * 44,
                    th: 2 + Math.floor(rng() * 4),
                })
        }
        for (let k = 0; k < cl / 45; k++)
            streaks.push({ x: rng() * cl, y: Math.round(4 + rng() * 14), len: 10 + rng() * 30, th: 1 })
        streaks.sort((a, b) => a.y - b.y)
        for (const s of streaks) {
            for (let r = 0; r < s.th; r++) {
                const rl = s.len * (0.55 + 0.45 * Math.sin((Math.PI * (r + 0.5)) / s.th)) + (rng() - 0.5) * 6
                const sx = Math.round(s.x + (s.len - rl) / 2 + (rng() - 0.5) * 4)
                const col = s.th === 1 ? midc : r === s.th - 1 ? light : r === s.th - 2 ? midc : shade
                for (let x = sx; x < sx + rl; x++) put(cb, x, s.y + r, col, s.th === 1 ? 0.6 : 1)
            }
        }
    }

    // ── far skyline: pale rose towers, dot windows, spires ──
    const fl = Math.max(520, bw + 40)
    const fb = makeBuf(fl, ART_H)
    const flb = makeBuf(fl, ART_H)
    {
        const rng = rngFrom(seed * 31 + 2)
        const rl = rngFrom(seed * 31 + 5)
        const ft = parseColor(adv.farTop)
        const fbm = parseColor(adv.farBottom)
        const edge = mix(ft, [0, 0, 0, 1], 0.15)
        const lo = Math.min(adv.farMinWidth, adv.farMaxWidth)
        const hi = Math.max(adv.farMinWidth, adv.farMaxWidth)
        let x = 0
        while (x < fl) {
            const w = Math.max(3, Math.round(((lo + (hi - lo) * rng()) * ART_H) / 100))
            const t = Math.round(rng() < 0.15 ? 62 + rng() * 20 : 88 + rng() * 60)
            const bottom = 166
            for (let y = t; y <= bottom; y++) {
                const f = (y - t) / (bottom - t)
                for (let k = 0; k < w; k++) put(fb, x + k, y, k === 0 ? edge : f > thr(x + k, y) ? fbm : ft)
            }
            if (rng() < 0.8)
                for (let wy = t + 3; wy < 150; wy += 3)
                    for (let wx = x + 1; wx < x + w - 1; wx += 2)
                        if (rng() < dens * 0.6) put(fb, wx, wy, rng() < 0.6 ? win : warm)
                        else if (rl() < 0.7) put(flb, wx, wy, rl() < 0.5 ? win : warm)
            if (rng() < 0.2) {
                const sh = 6 + Math.floor(rng() * 10)
                const sx = x + Math.floor(w / 2)
                for (let i = 0; i < sh; i++) put(fb, sx, t - 1 - i, ft)
                for (let i = -1; i <= 1; i++) {
                    put(fb, sx + i, t - 1, ft)
                    put(fb, sx + i, t - 2, ft)
                }
            }
            x += w + (rng() < 0.3 ? Math.floor(rng() * 4) : 0)
        }
    }

    // ── mid skyline: tall plum towers with bar windows; gaps reveal the sun ──
    const ml = Math.max(620, bw + 40)
    const mb = makeBuf(ml, ART_H)
    const tops = new Int16Array(ml).fill(ART_H)
    const mlb = makeBuf(ml, ART_H)
    {
        const rng = rngFrom(seed * 31 + 3)
        const rl = rngFrom(seed * 31 + 6)
        const mt = parseColor(adv.midTop)
        const mbt = parseColor(adv.midBottom)
        const rim = mix(mt, hot, 0.3)
        const shadeEdge = mix(mt, [0, 0, 0, 1], 0.3)
        const lo = Math.min(adv.midMinWidth, adv.midMaxWidth)
        const hi = Math.max(adv.midMinWidth, adv.midMaxWidth)
        const gc = clamp(adv.gapChance, 0, 100) / 100
        const fill = (x0: number, x1: number, y0: number, y1: number, c: RGBA) => {
            for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(mb, x, y, c)
        }
        let x = 0
        while (x < ml) {
            x += rng() < gc ? 3 + Math.floor(Math.pow(rng(), 1.6) * 26) : rng() < 0.5 ? 0 : 1
            if (x >= ml) break
            let w = Math.round(((lo + (hi - lo) * rng()) * ART_H) / 100)
            w = Math.min(w, ml - x)
            if (w < 6) break
            const short = rng() < 0.3
            const t = Math.round(short ? 108 + rng() * 30 : 20 + rng() * 40)
            const bottom = 166
            for (let y = t; y <= bottom; y++) {
                const f = (y - t) / (bottom - t)
                for (let k = 0; k < w; k++)
                    put(mb, x + k, y, k === 0 ? rim : k === w - 1 ? shadeEdge : f > thr(x + k, y) ? mbt : mt)
            }
            for (let k = 0; k < w; k++) tops[x + k] = Math.min(tops[x + k], t)
            const roof = rng()
            if (roof < 0.35) {
                const nw = Math.max(3, Math.round(w * (0.35 + rng() * 0.3)))
                const nh = 3 + Math.floor(rng() * 6)
                const nx = x + Math.round(rng() * (w - nw))
                fill(nx, nx + nw - 1, t - nh, t - 1, mt)
                for (let k = nx; k < nx + nw; k++) tops[k] = Math.min(tops[k], t - nh)
            } else if (roof < 0.55) {
                const ax = x + Math.round(w * (0.3 + rng() * 0.4))
                const ah = 6 + Math.floor(rng() * 12)
                fill(ax, ax, t - ah, t - 1, mt)
                fill(ax - 1, ax + 1, t - 2, t - 1, mt)
            } else if (roof < 0.68) {
                const sh = 8 + Math.floor(rng() * 14)
                const cx = x + Math.floor(w / 2)
                for (let i = 0; i < sh; i++) {
                    const half = Math.round((w / 2) * (1 - i / sh) * 0.6)
                    fill(cx - half, cx + half, t - 1 - i, t - 1 - i, mt)
                }
            }
            let nb = 0
            if (!short || rng() < 0.5) {
                const cols = w >= 26 && rng() < 0.5 ? 2 : 1
                nb = 3 + Math.floor(rng() * 3)
                const bw_ = cols === 2 ? Math.max(3, Math.round(w * 0.28)) : Math.max(3, Math.round(w * (0.4 + rng() * 0.2)))
                for (let c = 0; c < cols; c++) {
                    const bx = cols === 2 ? x + 3 + c * Math.round(w / 2) : x + Math.round((w - bw_) / 2 + (rng() - 0.5) * 4)
                    for (let b = 0; b < nb; b++) fill(bx, bx + bw_ - 1, t + 4 + b * 3, t + 4 + b * 3, b === nb - 1 ? warm : win)
                }
                if (rng() < 0.35) {
                    const gy = t + 30 + Math.floor(rng() * 20)
                    const gx = x + 2 + Math.floor(rng() * Math.max(1, w - bw_ - 4))
                    for (let b = 0; b < 3; b++) fill(gx, gx + bw_ - 2, gy + b * 3, gy + b * 3, warm)
                }
            }
            for (let wy = t + 8 + nb * 3; wy < 160; wy += 3)
                for (let wx = x + 2; wx < x + w - 2; wx += 2)
                    if (rng() < dens * 0.35) {
                        const c = rng() < 0.5 ? win : warm
                        put(mb, wx, wy, c)
                        if (rng() < 0.3) put(mb, wx + 1, wy, c)
                    } else if (rl() < 0.6) put(mlb, wx, wy, rl() < 0.5 ? win : warm)
            x += w
        }
    }

    // ── sun: flat cream disc, warm rim, dithered glow ──
    const sunR = Math.max(4, Math.round(((clamp(p.sunSize ?? 27, 5, 60) / 100) * ART_H) / 2))
    const sunG = Math.max(2, Math.round((adv.glowSize / 100) * ART_H))
    const S = 2 * (sunR + sunG) + 3
    const sunBuf = makeBuf(S, S)
    {
        const c0 = (S - 1) / 2
        const deepGlow = mix(hot, skyMid, 0.5)
        const rimc = mix(warm, hot, 0.4)
        const gs = clamp(adv.glowStrength, 0, 100) / 100
        for (let y = 0; y < S; y++)
            for (let x = 0; x < S; x++) {
                const d = Math.hypot(x - c0, y - c0)
                if (d <= sunR) {
                    put(sunBuf, x, y, d > sunR - 1.2 ? rimc : d > sunR - 2.6 && thr(x, y) < 0.5 ? warm : sunCol)
                } else {
                    const g = 1 - (d - sunR) / sunG
                    if (g <= 0) continue
                    const a = gs * Math.pow(g, 1.5)
                    const level = Math.floor(a * 4 + thr(x, y)) / 4
                    if (level > 0) put(sunBuf, x, y, mix(deepGlow, hot, g), level)
                }
            }
    }
    const sunX = Math.round(bw / 2 + (adv.sunX / 100) * bw)
    const sunY = Math.round((adv.sunY / 100) * ART_H)

    // Line the widest opening in the mid skyline up with the sun on the first frame.
    let best = 0
    let bestC = 0
    {
        let run = 0
        for (let dx = -sunR; dx <= sunR; dx++) if (tops[mod(dx, ml)] > sunY) run++
        for (let c = 0; c < ml; c++) {
            if (run > best) {
                best = run
                bestC = c
            }
            if (tops[mod(c - sunR, ml)] > sunY) run--
            if (tops[mod(c + sunR + 1, ml)] > sunY) run++
        }
    }
    const midPhase = bestC - sunX

    // ── haze band, water glow, floor ──
    const hb = makeBuf(bw, ART_H)
    {
        const hs = clamp(adv.hazeStrength, 0, 100) / 100
        for (let y = 124; y < 182; y++) {
            const v0 = y <= 154 ? Math.pow(clamp((y - 128) / 26, 0, 1), 1.5) : 1 - ((y - 154) / 28) * 0.45
            for (let x = 0; x < bw; x++) {
                const v = v0 * hs * (0.8 + 0.2 * Math.exp(-Math.pow((x - sunX) / (bw * 0.35), 2)))
                const th = thr(x, y)
                if (v > th) put(hb, x, y, v > 0.7 && th < (v - 0.7) * 3 ? warm : hot)
            }
        }
        for (let y = 182; y < ART_H; y++)
            for (let x = 0; x < bw; x++) put(hb, x, y, y === 182 && ((x + y) & 1) === 0 ? deep : bg)
    }

    // ── sun reflection between the balusters ──
    const rw = Math.max(4, Math.round(ART_H * 0.07))
    const rb = makeBuf(2 * rw + 1, 24)
    {
        const rng = rngFrom(seed * 31 + 4)
        for (let x = 0; x <= 2 * rw; x++) {
            const m = 0.35 + 0.65 * rng()
            for (let y = 0; y < 24; y++) {
                const v = Math.pow(Math.max(0, 1 - Math.abs(x - rw) / rw), 1.1) * m * (0.75 + 0.25 * rng()) * (1 - (y / 24) * 0.35)
                if (v * 1.5 > thr(x, y)) put(rb, x, y, v > 0.55 ? sunCol : v > 0.3 ? warm : hot)
            }
        }
    }

    // ── street lamp sprite (art rows 74–185, post at x 20) ──
    const lb = makeBuf(40, 112)
    {
        const dark = parseColor(adv.lampColor)
        const L = (x: number, y: number, c: RGBA = dark) => put(lb, x, y - 74, c)
        const R = (x0: number, x1: number, y0: number, y1: number, c: RGBA = dark) => {
            for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) L(x, y, c)
        }
        const cx = 20
        R(cx - 1, cx, 84, 171)
        R(cx, cx, 78, 83)
        R(cx - 1, cx + 1, 81, 81)
        for (let dx = -14; dx <= 14; dx++) {
            const ay = 89 - Math.round(2 * Math.pow(dx / 14, 2))
            L(cx + dx, ay)
            if (Math.abs(dx) < 9) L(cx + dx, ay + 1)
        }
        for (const s of [-1, 1]) {
            L(cx + s * 5, 92)
            L(cx + s * 6, 93)
            L(cx + s * 5, 94)
            L(cx + s * 4, 94)
            const lx = cx + s * 14
            R(lx - 3, lx + 3, 86, 86)
            for (let y = 80; y <= 85; y++)
                for (let x = lx - 3; x <= lx + 3; x++) {
                    const ax = Math.abs(x - lx)
                    L(x, y, ax === 3 ? dark : ax <= 1 && y >= 81 && y <= 84 ? win : warm)
                }
            R(lx - 4, lx + 4, 79, 79)
            R(lx - 2, lx + 2, 78, 78)
            R(lx - 1, lx + 1, 77, 77)
            L(lx, 76)
        }
        R(cx - 2, cx + 1, 95, 97)
        R(cx - 2, cx + 1, 164, 171)
        R(cx - 3, cx + 2, 172, 179)
        R(cx - 4, cx + 3, 180, 183)
    }

    // ── vignette, dithered towards the background colour ──
    let vig: HTMLCanvasElement | null = null
    const vs = clamp(adv.vignette, 0, 100) / 100
    if (vs > 0) {
        const vb = makeBuf(bw, bh)
        for (let y = 0; y < bh; y++)
            for (let x = 0; x < bw; x++) {
                const nx = (x - bw / 2) / (bw / 2)
                const ny = (y - bh / 2) / (bh / 2)
                // weighted to top and bottom so the scene runs edge to edge across the width
                const d = Math.sqrt(0.08 * nx * nx + ny * ny) / Math.sqrt(1.08)
                const s = clamp((d - 0.35) / 0.65, 0, 1)
                const v = s * s * (3 - 2 * s) * vs * 1.6
                if (v > thr(x, y)) put(vb, x, y, bg)
            }
        vig = toCanvas(vb)
    }

    return {
        key,
        bw,
        bh,
        yBase,
        sky: toCanvas(sb),
        clouds: toCanvas(cb),
        far: toCanvas(fb),
        mid: toCanvas(mb),
        farLit: toCanvas(flb),
        midLit: toCanvas(mlb),
        tops,
        midPhase,
        sun: toCanvas(sunBuf),
        sunR,
        sunG,
        sunX,
        sunY,
        haze: toCanvas(hb),
        reflect: toCanvas(rb),
        reflectW: rw,
        lamp: toCanvas(lb),
        vig,
    }
}

// `off` arrives already snapped (whole art px for the scroll, sub-pixel steps for the pointer lean).
function drawStrip(g: CanvasRenderingContext2D, img: HTMLCanvasElement, off: number, y: number, bw: number) {
    const L = img.width
    for (let x = -mod(off, L); x < bw; x += L) g.drawImage(img, x, y)
}

/**
 * Pixel Parallax Skyline — a dusk city in pixel art scrolling past a fixed sun, layer by layer.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
export default function PixelParallaxSkyline(props: any) {
    props = withMovedControls(props)
    const {
        background = "#000000",
        skyTop = "#261D34",
        skyHorizon = "#E87366",
        sunColor = "#FFFAF5",
        speed = 50,
        scale = 100,
        depth = 50,
        sunSize = 27,
        lamps = true,
        style,
    } = props
    const rootRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const propsRef = useRef<any>(props)
    propsRef.current = { ...props, background, skyTop, skyHorizon, sunColor, speed, scale, depth, sunSize, lamps }
    const ptr = useRef({
        x: 0.5,
        mx: 0.5,
        tx: 0.5,
        y: 0.5,
        my: 0.5,
        ty: 0.5,
        over: 0,
        mo: 0,
        tover: 0,
        down: false,
        boost: 0,
        kick: 0,
        ripples: [] as { x: number; y: number; t: number }[],
    })

    useEffect(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        if (!root || !canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const target = RenderTarget.current()
        const frozen =
            target === RenderTarget.thumbnail ||
            target === RenderTarget.export ||
            (typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)

        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1)
            const w = Math.max(1, Math.round(root.offsetWidth * dpr))
            const h = Math.max(1, Math.round(root.offsetHeight * dpr))
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w
                canvas.height = h
            }
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(root)

        const buf = document.createElement("canvas")
        const g = buf.getContext("2d")!
        const noise = makeCanvas(128, 128)
        {
            const nctx = noise.getContext("2d")!
            const img = nctx.createImageData(128, 128)
            for (let i = 0; i < img.data.length; i += 4) {
                const v = Math.random() * 255
                img.data[i] = img.data[i + 1] = img.data[i + 2] = v
                img.data[i + 3] = 255
            }
            nctx.putImageData(img, 0, 0)
        }
        let grainPattern: CanvasPattern | null = null
        // windows switched on by the pointer: a layer of extra windows, masked to where the light is
        const litCanvas = makeCanvas(1, 1)
        const lc = litCanvas.getContext("2d")!
        const mask = makeCanvas(1, 1)
        const mk = mask.getContext("2d")!

        let scene: Scene | null = null
        let travel = 0
        let expo = 1
        let last: number | null = null
        let raf = 0

        const loop = (now: number) => {
            raf = requestAnimationFrame(loop)
            const p = propsRef.current
            const adv = { ...ADVANCED_DEFAULTS, ...(p.advanced ?? {}) }
            let dt = last == null ? 0 : (now - last) / 1000
            last = now
            dt = Math.min(Math.max(dt, 0), 1 / 20)
            const cw = canvas.width
            const ch = canvas.height
            if (cw < 2 || ch < 2) return

            const bh = Math.max(60, Math.round((ART_H * 100) / clamp(p.scale ?? 100, 50, 200)))
            const bw = Math.max(1, Math.ceil((bh * cw) / ch))
            const key = [
                bw, bh, p.background, p.skyTop, p.skyHorizon, p.sunColor, p.sunSize,
                adv.seed, adv.sunX, adv.sunY, adv.glowSize, adv.glowStrength, adv.skyDeep, adv.skyMid,
                adv.cloudColor, adv.cloudShadow, adv.farTop, adv.farBottom, adv.farMinWidth, adv.farMaxWidth,
                adv.midTop, adv.midBottom, adv.midMinWidth, adv.midMaxWidth, adv.gapChance,
                adv.windowColor, adv.windowWarm, adv.windowDensity, adv.hazeColor, adv.hazeStrength,
                adv.lampColor, adv.vignette,
            ].join("|")
            if (!scene || scene.key !== key) scene = buildScene(key, bw, bh, p, adv)
            const s = scene
            // The art buffer is drawn SS× finer than an art pixel so the scroll, the pointer's lean and
            // the sun's lift glide in ~1 CSS px steps instead of jumping a whole art pixel (4 CSS px).
            const SS = clamp(Math.round(ch / bh), 1, 4)
            const q = (v: number) => Math.round(v * SS) / SS
            if (buf.width !== bw * SS || buf.height !== bh * SS) {
                buf.width = bw * SS
                buf.height = bh * SS
            }

            // pointer: the layers lean with it, the sun rises and sets with its height and the
            // windows under it switch on; a press sends a wave of lights through the city,
            // flares the lamps it passes and surges the scroll, holding keeps it fast
            const P = ptr.current
            const hk = Math.max(0, adv.hover) / 50
            // two chained eases: the response starts gently and settles gently (ease in and out)
            const e = 1 - Math.exp(-dt * 6)
            P.mx += (P.tx - P.mx) * e
            P.x += (P.mx - P.x) * e
            P.my += (P.ty - P.my) * e
            P.y += (P.my - P.y) * e
            P.mo += (P.tover - P.mo) * e
            P.over += (P.mo - P.over) * e
            P.boost += ((P.down ? 1 : 0) - P.boost) * (1 - Math.exp(-dt * 3))
            P.kick *= Math.exp(-dt * 2.2)
            for (const r of P.ripples) r.t += dt
            if (P.ripples.length && P.ripples[0].t > RIPPLE_LIFE) P.ripples = P.ripples.filter((r) => r.t < RIPPLE_LIFE)

            const speedF = Math.max(0, p.speed ?? 50) / 50
            if (!frozen)
                travel += dt * (adv.baseSpeed / 100) * ART_H * speedF * (1 + 1.2 * P.boost * hk + 2.5 * P.kick * hk)

            const d = clamp(p.depth ?? 50, 0, 100) / 50
            const ratio = (r: number) => Math.pow(Math.max(0.01, r), d)
            const lean = (P.x - 0.5) * 2 * P.over * hk * (adv.parallax / 50)
            const glowBoost = 1 + 0.35 * P.over * hk
            const yB = s.yBase
            const px = P.x * bw
            const py = P.y * bh - yB
            const spot = frozen ? 0 : clamp(P.over * hk, 0, 1)
            const rk = Math.min(1, hk)
            let flash = 0
            for (const r of P.ripples) flash = Math.max(flash, Math.max(0, 1 - r.t / 0.7))
            // 0..1 light the click waves throw on a point (art px, y from the scene top)
            const waveAt = (x: number, y: number) => {
                let v = 0
                for (const r of P.ripples) {
                    const dd = Math.hypot(x - r.x * bw, y - (r.y * bh - yB))
                    v = Math.max(v, (1 - r.t / RIPPLE_LIFE) * Math.exp(-Math.pow((dd - rippleRadius(r.t)) / 16, 2)))
                }
                return v * rk
            }
            const lift = q((0.5 - P.y) * 2 * P.over * hk * 12)
            const sunYNow = s.sunY - lift

            g.setTransform(SS, 0, 0, SS, 0, 0)
            g.globalCompositeOperation = "source-over"
            g.globalAlpha = 1
            g.imageSmoothingEnabled = false
            g.clearRect(0, 0, bw, bh)
            g.drawImage(s.sky, 0, 0)
            drawStrip(g, s.clouds, q(travel * ratio(adv.cloudSpeed / 100) + lean * 2), yB, bw)

            const sx = s.sunX - q(lean)
            const sy = yB + sunYNow
            g.drawImage(s.sun, sx - Math.floor(s.sun.width / 2), sy - Math.floor(s.sun.height / 2))

            // light mask: a soft pool under the pointer plus each click's travelling ring
            const anyLit = spot > 0.01 || (P.ripples.length > 0 && rk > 0)
            if (anyLit) {
                if (litCanvas.width !== bw * SS || litCanvas.height !== ART_H * SS) {
                    litCanvas.width = mask.width = bw * SS
                    litCanvas.height = mask.height = ART_H * SS
                }
                mk.setTransform(SS, 0, 0, SS, 0, 0)
                mk.globalCompositeOperation = "source-over"
                mk.clearRect(0, 0, bw, ART_H)
                mk.globalCompositeOperation = "lighter"
                if (spot > 0.01) {
                    const R0 = ART_H * 0.42
                    const gr = mk.createRadialGradient(px, py, 0, px, py, R0)
                    gr.addColorStop(0, white(spot))
                    gr.addColorStop(0.55, white(spot * 0.6))
                    gr.addColorStop(1, white(0))
                    mk.fillStyle = gr
                    mk.fillRect(px - R0, py - R0, R0 * 2, R0 * 2)
                }
                for (const r of P.ripples) {
                    const f = (1 - r.t / RIPPLE_LIFE) * rk
                    const rad = rippleRadius(r.t)
                    const outer = rad + 18
                    const cx = r.x * bw
                    const cy = r.y * bh - yB
                    const gr = mk.createRadialGradient(cx, cy, 0, cx, cy, outer)
                    gr.addColorStop(0, white(0.3 * f * f))
                    gr.addColorStop(Math.max(0, (rad - 30) / outer), white(0.45 * f))
                    gr.addColorStop(rad / outer, white(f))
                    gr.addColorStop(1, white(0))
                    mk.fillStyle = gr
                    mk.fillRect(0, 0, bw, ART_H)
                }
            }
            const drawLit = (layer: HTMLCanvasElement, off: number) => {
                if (!anyLit) return
                lc.setTransform(SS, 0, 0, SS, 0, 0)
                lc.imageSmoothingEnabled = false
                lc.globalCompositeOperation = "source-over"
                lc.clearRect(0, 0, bw, ART_H)
                drawStrip(lc, layer, off, 0, bw)
                lc.globalCompositeOperation = "destination-in"
                lc.drawImage(mask, 0, 0, bw, ART_H)
                lc.globalCompositeOperation = "source-over"
                g.drawImage(litCanvas, 0, yB, bw, ART_H)
            }

            // every layer scrolls in sub-pixel steps: whole art pixels made the slow layers move
            // 1 px on some frames and 0 on others, which read as stutter
            const farOff = q(travel * ratio(adv.farSpeed / 100) + lean * 4)
            drawStrip(g, s.far, farOff, yB, bw)
            drawLit(s.farLit, farOff)
            const midOff = q(s.midPhase + travel + lean * 8)
            drawStrip(g, s.mid, midOff, yB, bw)
            drawLit(s.midLit, midOff)

            // how much of the sun the mid skyline leaves open
            const L = s.tops.length
            const midCol = Math.round(midOff)
            let open = 0
            for (let dx = -s.sunR; dx <= s.sunR; dx++) if (s.tops[mod(s.sunX + dx + midCol, L)] > sunYNow) open++
            const target = open / (2 * s.sunR + 1)
            expo = frozen ? target : expo + (target - expo) * (1 - Math.exp(-dt * 8))

            const hot = parseColor(adv.hazeColor)
            const R = s.sunR + s.sunG * 2.6
            const ha = (adv.haloStrength / 100) * (0.45 + 0.55 * expo) * glowBoost * (1 + 1.2 * flash * rk)
            const halo = g.createRadialGradient(sx, sy, s.sunR * 0.6, sx, sy, R)
            halo.addColorStop(0, css(hot, ha))
            halo.addColorStop(0.45, css(hot, ha * 0.4))
            halo.addColorStop(1, css(hot, 0))
            g.globalCompositeOperation = "lighter"
            g.fillStyle = halo
            g.fillRect(sx - R, sy - R, R * 2, R * 2)
            g.globalCompositeOperation = "source-over"

            g.drawImage(s.haze, 0, yB)
            g.globalAlpha = clamp(adv.reflection / 100, 0, 1) * (0.3 + 0.7 * expo)
            g.drawImage(s.reflect, sx - s.reflectW, yB + 158)
            g.globalAlpha = 1

            const fgOff = q(travel * ratio(adv.frontSpeed / 100) + lean * 16)
            g.fillStyle = css(parseColor(adv.railColor))
            g.fillRect(0, yB + 156, bw, 2)
            g.fillRect(0, yB + 181, bw, 1)
            for (let x = -mod(fgOff, 4); x < bw; x += 4) g.fillRect(x, yB + 158, 1, 23)

            if (p.lamps !== false) {
                const S = Math.max(40, Math.round((adv.lampSpacing / 100) * ART_H))
                const first = mod(Math.round((adv.lampX / 100) * bw) - fgOff, S) - S
                const lg = parseColor(adv.lampGlow)
                for (let x = first; x < bw + 25; x += S) {
                    g.drawImage(s.lamp, x - 20, yB + 74)
                    g.globalCompositeOperation = "lighter"
                    for (const lx of [x - 14, x + 14]) {
                        // lanterns flare as a click wave passes and warm up near the pointer
                        const fl = Math.min(1.5, waveAt(lx, 83) + spot * Math.exp(-Math.pow((lx - px) / 40, 2)))
                        const gR = 9 + 7 * fl
                        const gr = g.createRadialGradient(lx + 0.5, yB + 83, 1, lx + 0.5, yB + 83, gR)
                        gr.addColorStop(0, css(lg, 0.55 * glowBoost * (1 + 1.6 * fl)))
                        gr.addColorStop(1, css(lg, 0))
                        g.fillStyle = gr
                        g.fillRect(lx - gR, yB + 83 - gR, gR * 2 + 1, gR * 2 + 1)
                    }
                    g.globalCompositeOperation = "source-over"
                }
            }
            if (s.vig) g.drawImage(s.vig, 0, 0)

            // upscale the art buffer with hard pixels
            ctx.globalCompositeOperation = "source-over"
            ctx.globalAlpha = 1
            ctx.imageSmoothingEnabled = false
            ctx.clearRect(0, 0, cw, ch)
            const k = ch / bh
            const dw = bw * k
            ctx.drawImage(buf, 0, 0, buf.width, buf.height, Math.round((cw - dw) / 2), 0, Math.round(dw), ch)

            const grain = clamp(adv.grain, 0, 100) / 100
            if (grain > 0) {
                if (!grainPattern) grainPattern = ctx.createPattern(noise, "repeat")
                if (grainPattern) {
                    const rx = Math.floor(Math.random() * 128)
                    const ry = Math.floor(Math.random() * 128)
                    ctx.save()
                    ctx.globalCompositeOperation = "overlay"
                    ctx.globalAlpha = grain * 0.5
                    ctx.translate(rx, ry)
                    ctx.fillStyle = grainPattern
                    ctx.fillRect(-rx, -ry, cw, ch)
                    ctx.restore()
                }
            }
        }
        raf = requestAnimationFrame(loop)

        const release = () => {
            ptr.current.down = false
        }
        window.addEventListener("pointerup", release)
        window.addEventListener("pointercancel", release)
        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            window.removeEventListener("pointerup", release)
            window.removeEventListener("pointercancel", release)
        }
    }, [])

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = rootRef.current
        if (!el) return
        const w = el.offsetWidth || 1
        const h = el.offsetHeight || 1
        ptr.current.tx = clamp(e.nativeEvent.offsetX / w, 0, 1)
        ptr.current.ty = clamp(e.nativeEvent.offsetY / h, 0, 1)
        ptr.current.tover = 1
    }

    return (
        <div
            ref={rootRef}
            onPointerMove={onMove}
            onPointerEnter={onMove}
            onPointerLeave={() => {
                ptr.current.tover = 0
                ptr.current.tx = 0.5
                ptr.current.ty = 0.5
            }}
            onPointerDown={(e) => {
                onMove(e)
                const P = ptr.current
                P.down = true
                P.kick = 1
                P.ripples.push({ x: P.tx, y: P.ty, t: 0 })
                if (P.ripples.length > 4) P.ripples.shift()
            }}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 1200,
                minHeight: 800,
                ...style,
                background,
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                    imageRendering: "pixelated",
                }}
            />
        </div>
    )
}

