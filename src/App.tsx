import React, { useState, useEffect } from "react"
import "./App.css"

import CropRect from "./CropRect"

interface ImageContainerSize {
	width: string
	height: string
}

function App() {
	const [imageContainerSize, setImageContainerSize] = useState<
		ImageContainerSize
	>({
		width: "100vw",
		height: "100vh"
	})

	useEffect(() => {
		const containerElement = document.querySelector("main")
		const imageElement = document.querySelector("img")

		window.addEventListener("load", event => {
			if (containerElement && imageElement) {
				const {
					clientHeight: containerHeight,
					clientWidth: containerWidth
				} = containerElement

				const {
					naturalHeight: imageHeight,
					naturalWidth: imageWidth
				} = imageElement

				const imageRatio = imageWidth / imageHeight

				console.log(containerWidth)
				console.log(containerHeight)

				const largerSide = imageWidth >= imageHeight ? containerWidth : containerHeight
				console.log(`largerSide: ${largerSide}`)
				
				setImageContainerSize({
					width: `${imageWidth >= imageHeight ? containerWidth : containerHeight * imageRatio}px`,
					height: `${imageWidth >= imageHeight ? containerWidth / imageRatio : containerHeight}px`
				})
			}
		})
	})

	return (
		<main
			className="App"
			style={{
				width: imageContainerSize.width,
				height: imageContainerSize.height
			}}
		>
			<img
				className="user-image"
				src="/assets/stock-test-1.jpg"
				alt="file user uploaded to use in cropping mechanism"
			/>
			<CropRect />
		</main>
	)
}

export default App
