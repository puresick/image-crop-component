// NOTE: CropRectResizeHandler contains all the resize logic per visual handle
// indicating the possibility to resize CropRect
//
import React from "react"
// NOTE: `DraggableCore` is being used here instead of `Draggable` to fix a misbehavior
// in CropRectResizeHandler being positioned wrong. This might be a result regarding
// internal state handling by `Draggable`
import { DraggableCore } from "react-draggable"

import "./CropRectResizeHandler.css"

interface CropRectResizeHandlerProps {
	cropRect: Object
	handlePosition: String
	imageContainerSize: ImageContainerSize
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

interface ImageContainerSize {
	width: string
	height: string
}

// NOTE: This function handles CropRect resizing by calculating and settings its state
// `handlePosition` is a string being passed as prop describing on which corner the handle sits
// Possible values are:
// - "topleft"
// - "topright"
// - "bottomleft"
// - "bottomright"
//
function updateCropRect(
	oldCrop: CropRect,
	data: DraggableData,
	handlePosition: String
) {
	const { height: oldHeight, width: oldWidth, x: oldX, y: oldY, minWidth, minHeight } = oldCrop
	const { deltaX, deltaY } = data

	// NOTE: Copying the old properties describing CropRect dimensions and
	// recalculating the new values (excluding `minHeight` and `minWidth` being
	// always static (and passed through by `...oldCrop`)
	//
	// Each value will be recalculated below. `width` and `height` are also being
	// checked against the `minHeight` and `minWidth` values to set a minimum size
	// for CropRect
	//
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
		<DraggableCore
			onDrag={(e, data) => {
				setCropRect((oldCrop: CropRect) =>
					updateCropRect(oldCrop, data, handlePosition)
				)
			}}
		>
			<div className={`croparea--hotcorner position-${handlePosition}`}></div>
		</DraggableCore>
	)
}

export default CropRectResizeHandler
