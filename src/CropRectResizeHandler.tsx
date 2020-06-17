import React, { useState } from "react"
import Draggable, { DraggableCore } from "react-draggable"

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
	minWidth: number
	minHeight: number
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
	console.log("updateCropRect")
	const { height: oldHeight, width: oldWidth, x: oldX, y: oldY, minWidth, minHeight } = oldCrop
	const { deltaX, deltaY } = data

	const copyCrop = {
		...oldCrop,
		width:
			handlePosition === "topleft" || handlePosition === "bottomleft"
				? oldWidth - deltaX >= minWidth ? oldWidth - deltaX : minWidth
				: oldWidth + deltaX >= minWidth ? oldWidth + deltaX : minWidth,
		height:
			handlePosition === "topleft" || handlePosition === "topright"
				? oldHeight - deltaY >= minHeight ? oldHeight - deltaY : minHeight
				: oldHeight + deltaY >= minHeight ? oldHeight + deltaY : minHeight,
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
			<DraggableCore
				onDrag={(e, data) => {
					// console.log(data)
					setCropRect((oldCrop: CropRect) =>
						updateCropRect(oldCrop, data, handlePosition)
					)
				}}
			>
				<div className={`croparea--hotcorner position-${handlePosition}`}></div>
			</DraggableCore>
		</React.Fragment>
	)
}

export default CropRectResizeHandler