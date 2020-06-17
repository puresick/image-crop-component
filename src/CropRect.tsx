import React, { useState } from "react"
import Draggable, { DraggableCore } from "react-draggable"

import "./CropRect.css"
import CropRectResizeHandler from "./CropRectResizeHandler"

interface CropRect {
	x: number
	y: number
	width: number
	height: number
	minWidth: number
	minHeight: number
}

function CropRect() {
	const [cropRect, setCropRect] = useState<CropRect>({
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		minWidth: 80,
		minHeight: 80
	})

	return (
		<Draggable bounds="main" cancel=".croparea--hotcorner">
			<section
				className="croparea"
				style={{
					width: cropRect.width,
					height: cropRect.height
				}}
			>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					handlePosition="topleft"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					handlePosition="topright"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					handlePosition="bottomleft"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					handlePosition="bottomright"
				/>
			</section>
		</Draggable>
	)
}

export default CropRect
