import React, { useState } from "react"
import Draggable from "react-draggable"

import "./CropRectResizeHandler.css"

interface CropRectResizeHandlerProps {
	cropRect: Object
	handlePosition: String
	setCropRect: Function
}

interface CropRect {
	x: number
	y: number
	width: number
	height: number
}

interface DraggableData {
	node: HTMLElement
	x: number
	y: number
	deltaX: number
	deltaY: number
	lastX: number
	lastY: number
}

function updateCropRect(
	oldCrop: CropRect,
	data: DraggableData,
	handlePosition: String
) {
	const { height: oldHeight, width: oldWidth, x: oldX, y: oldY } = oldCrop
	const { deltaX, deltaY } = data

	const copyCrop = {
		...oldCrop,
		width:
			handlePosition === "topleft" || handlePosition === "bottomleft"
				? oldWidth - deltaX
				: oldWidth + deltaX,
		height:
			handlePosition === "topleft" || handlePosition === "topright"
				? oldHeight - deltaY
				: oldHeight + deltaY,
		x:
			handlePosition === "topleft" || handlePosition === "bottomleft"
				? oldX + deltaX
				: oldX,
		y:
			handlePosition === "topleft" || handlePosition === "topright"
				? oldY + deltaY
				: oldY
	}

	return copyCrop
}

function CropRectResizeHandler(props: CropRectResizeHandlerProps) {
	const { handlePosition, setCropRect } = props

	return (
		<React.Fragment>
			<div className={`croparea--hotcorner position-${handlePosition}`}></div>
			<Draggable
				onDrag={(e, data) => {
					console.log(data)
					setCropRect((oldCrop: CropRect) =>
						updateCropRect(oldCrop, data, handlePosition)
					)
				}}
				position={{ x: 0, y: 0 }}
			>
				<div className={`croparea--hotcorner invisible position-${handlePosition}`}></div>
			</Draggable>
		</React.Fragment>
	)
}

export default CropRectResizeHandler
