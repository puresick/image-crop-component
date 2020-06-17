// NOTE: Component containing the logic for the visual
// cropping constraints being rendered onto the image
// It basically uses just the functionality from react-draggable
// so users are able to move the element around

import React, { useState } from "react"
import Draggable from "react-draggable"

import "./CropRect.css"
import CropRectResizeHandler from "./CropRectResizeHandler"

interface CropRectProps {
	imageContainerSize: ImageContainerSize
}

interface CropRect {
	x: number
	y: number
	width: number
	height: number
	minWidth: number
	minHeight: number
}

interface ImageContainerSize {
	width: string
	height: string
}

function CropRect(props: CropRectProps) {
	const { imageContainerSize } = props
	const [cropRect, setCropRect] = useState<CropRect>({
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		minWidth: 80,
		minHeight: 80
	})

	return (
		<Draggable cancel=".croparea--hotcorner">
			<section
				className="croparea"
				style={{
					width: cropRect.width,
					height: cropRect.height,
					top: cropRect.y,
					left: cropRect.x
				}}
			>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					imageContainerSize={imageContainerSize}
					handlePosition="topleft"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					imageContainerSize={imageContainerSize}
					handlePosition="topright"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					imageContainerSize={imageContainerSize}
					handlePosition="bottomleft"
				/>
				<CropRectResizeHandler
					cropRect={cropRect}
					setCropRect={setCropRect}
					imageContainerSize={imageContainerSize}
					handlePosition="bottomright"
				/>
			</section>
		</Draggable>
	)
}

export default CropRect
