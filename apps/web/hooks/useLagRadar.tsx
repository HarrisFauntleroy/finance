/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react"

import { useWindowSize } from "@react-hook/window-size"

function lagRadar(config = {}) {
	const {
		frames = 60, // number of frames to draw, more = worse performance
		speed = 0.0017, // how fast the sweep moves (rads per ms)
		size = 300, // outer frame px
		inset = 3, // circle inset px
		parent = document.body, // DOM node to attach to
	} = config

	const svgns = "http://www.w3.org/2000/svg"

	const styles = document.createTextNode(`
    .lagRadar {
      pointer-events: none;
    }
    .lagRadar-sweep > * {
      shape-rendering: crispEdges;
    }
    .lagRadar-face {
      fill: transparent;
    }
    .lagRadar-hand {
      stroke-width: 4px;
      stroke-linecap: round;
    }
  `)

	function $svg(tag, props = {}, children = []) {
		const el = document.createElementNS(svgns, tag)
		Object.keys(props).forEach((prop) => el.setAttribute(prop, props[prop]))
		children.forEach((child) => el.appendChild(child))
		return el
	}

	const PI2 = Math.PI * 2
	const middle = size / 2
	const radius = middle - inset

	const $hand = $svg("path", { class: "lagRadar-hand" })
	const $arcs = new Array(frames).fill("path").map((t) => $svg(t))
	const $root = $svg("svg", { class: "lagRadar", height: size, width: size }, [
		$svg("style", { type: "text/css" }, [styles]),
		$svg("g", { class: "lagRadar-sweep" }, $arcs),
		$hand,
		$svg("circle", {
			class: "lagRadar-face",
			cx: middle,
			cy: middle,
			r: radius,
		}),
	])

	parent.appendChild($root)

	let frame: number
	let framePtr = 0
	let last = {
		rotation: 0,
		now: Date.now(),
		tx: middle + radius,
		ty: middle,
	}

	const calcHue = (() => {
		const MAX_HUE = 120
		const MAX_MS = 1000
		const LOG_F = 10
		const mult = MAX_HUE / Math.log(MAX_MS / LOG_F)
		return function (ms_delta) {
			return (
				MAX_HUE -
				Math.max(0, Math.min(mult * Math.log(ms_delta / LOG_F), MAX_HUE))
			)
		}
	})()

	function animate() {
		const now = Date.now()
		const rdelta = Math.min(PI2 - speed, speed * (now - last.now))
		const rotation = (last.rotation + rdelta) % PI2
		const tx = middle + radius * Math.cos(rotation)
		const ty = middle + radius * Math.sin(rotation)
		const bigArc = rdelta < Math.PI ? "0" : "1"
		const path = `M${tx} ${ty}A${radius} ${radius} 0 ${bigArc} 0 ${last.tx} ${last.ty}L${middle} ${middle}`
		const hue = calcHue(rdelta / speed)

		$arcs[framePtr % frames].setAttribute("d", path)
		$arcs[framePtr % frames].setAttribute("fill", `hsl(${hue}, 80%, 40%)`)
		$hand.setAttribute("d", `M${middle} ${middle}L${tx} ${ty}`)
		$hand.setAttribute("stroke", `hsl(${hue}, 80%, 60%)`)

		for (let i = 0; i < frames; i++) {
			$arcs[(frames + framePtr - i) % frames].style.fillOpacity = 1 - i / frames
		}

		framePtr++
		last = {
			now,
			rotation,
			tx,
			ty,
		}

		frame = window.requestAnimationFrame(animate)
	}

	animate()

	return function destroy() {
		if (frame) {
			window.cancelAnimationFrame(frame)
		}
		$root.remove()
	}
}

export default function useLagRadar() {
	const [width, height] = useWindowSize()

	React.useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			return lagRadar({
				frames: 60, // number of frames to draw, more = worse performance
				speed: 0.0017, // (rads per ms)
				size: Math.min(width, height) / 3, // outer frame px
				inset: 3, // circle inset px
				parent: document.body, // DOM node to attach to
			})
		}
	}, [width, height])
}
