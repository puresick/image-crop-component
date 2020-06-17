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
		// NOTE: Below, the image size and ratio are being calculated to use as a
		// base value for calculating the larger size of the image and resizing the
		// img elements partent element (in this case the only `main` HTML element)
		// to fit the image - and therefore the CropRect bounding box - perfectly
		//
		const containerElement = document.querySelector("main")
		const imageElement = document.querySelector("img")

		// NOTE: Waiting for the DOM to be loaded completely to ensure the correct sizes
		// for `main` and `img` HTML elmenets are being gathered
		//
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

				setImageContainerSize({
					width: `${
						imageWidth >= imageHeight
							? containerWidth
							: containerHeight * imageRatio
					}px`,
					height: `${
						imageWidth >= imageHeight
							? containerWidth / imageRatio
							: containerHeight
					}px`
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
			{/*
				NOTE: There are two image files with different ratios in the asset folder
				Changing the number below to 2 in the filename should point to the other image
			*/}
			<img
				className="user-image"
				src="/assets/stock-test-1.jpg"
				alt="file user uploaded to use in cropping mechanism"
			/>
			<CropRect imageContainerSize={imageContainerSize} />
		</main>
	)
}

export default App
