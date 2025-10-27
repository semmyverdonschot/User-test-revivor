"use client";

import { useState } from "react";

const images = [
	{ id: "Red Bull", src: "/Red Bull.png", alt: "Red Bull" },
	{ id: "Monster", src: "/Monster.png", alt: "Monster" },
	{ id: "Fanta", src: "/Fanta.png", alt: "Fanta" },
	{ id: "Nocco", src: "/Nocco.png", alt: "Nocco" },
	{ id: "Lipton Ice Tea Peach", src: "/Lipton ice tea peach.png", alt: "Lipton Ice Tea Peach" },
	{ id: "Sprite", src: "/Sprite.png", alt: "Sprite" },
	{ id: "Revivor", src: "/Revivor.png", alt: "Revivor" },
	{ id: "Mountain dew", src: "/Mountain dew.png", alt: "Mountain dew" },
	{ id: "KAS zero", src: "/KAS zero.png", alt: "KAS zero" },
	{ id: "Perfy", src: "/Perfy.png", alt: "Perfy" },
];

const exampleImage = {
	id: "voorbeeld",
	src: "/voorbeeld.mov",
	alt: "Voorbeeld video",
};

export default function Home() {
	const [current, setCurrent] = useState(0);
	const [feeling, setFeeling] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [introStep, setIntroStep] = useState<"intro" | "example" | "quiz">(
		"intro"
	);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		await fetch("/api/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				imageId: images[current].id,
				feeling,
			}),
		});
		setLoading(false);
		setFeeling("");
		if (current < images.length - 1) {
			setCurrent(current + 1);
		} else {
			setSubmitted(true);
		}
	};

	// Introductie
	if (introStep === "intro") {
		return (
			<main className="flex flex-col items-center justify-center min-h-screen px-4">
				<div
					className="max-w-xl w-full rounded-lg p-8 mb-8"
					style={{
						background: "var(--color-background)",
						color: "var(--color-foreground)",
					}}
				>
					<h1 className="text-3xl font-bold mb-4 text-center">AB Testing</h1>
					<p className="mb-4 text-lg text-center">
						Welkom bij onze AB test. Je ziet straks een aantal plaatjes. Typ bij
						elk plaatje hoe je je erbij voelt. Klik op{" "}
						<b>Verstuur</b> om je gevoel op te slaan en ga automatisch door naar
						het volgende plaatje.
					</p>
					<button
						className="bg-white text-black px-6 py-2 rounded font-semibold mx-auto block"
						style={{ cursor: "pointer" }}
						onClick={() => setIntroStep("example")}
					>
						Start de test
					</button>
				</div>
			</main>
		);
	}

	// Voorbeeld
	if (introStep === "example") {
		return (
			<main className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-4">
				<div
					className="w-full max-w-xl rounded-lg p-4 sm:p-8 mb-8 flex flex-col items-center"
					style={{
						background: "var(--color-background)",
						color: "var(--color-foreground)",
					}}
				>
					<h2 className="text-2xl font-bold mb-4 text-center">Voorbeeld</h2>
					<video
						src={exampleImage.src}
						className="mb-4 w-full max-w-xs sm:max-w-md aspect-square object-contain rounded-lg mx-auto"
						autoPlay
						loop
						muted
						playsInline
						style={{ display: "block" }}
					/>

					<button
						className="bg-white text-black px-4 py-2 sm:px-6 sm:py-2 rounded font-semibold mx-auto block"
						style={{ cursor: "pointer" }}
						onClick={() => setIntroStep("quiz")}
					>
						Ga naar de test
					</button>
				</div>
			</main>
		);
	}

	// Bedankt
	if (submitted) {
		return (
			<main className="flex flex-col items-center justify-center min-h-screen px-4">
				<div
					className="max-w-xl w-full rounded-lg p-8"
					style={{
						background: "var(--color-background)",
						color: "var(--color-foreground)",
					}}
				>
					<h2 className="text-2xl font-bold mb-4 text-center">
						Bedankt voor het meedoen!
					</h2>
					<p className="text-center text-lg">
						Je antwoorden zijn opgeslagen.
					</p>
				</div>
			</main>
		);
	}

	// Quiz
	return (
		<main className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-4">
			<div
				className="w-full max-w-2xl rounded-lg p-4 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8 items-center"
				style={{
					background: "var(--color-background)",
					color: "var(--color-foreground)",
				}}
			>
				<div className="flex-1 flex flex-col items-center w-full">
					<img
						src={images[current].src}
						alt={images[current].alt}
						className="mb-4 w-full max-w-xs sm:max-w-xs aspect-square object-contain rounded-lg"
						style={{ border: "none", boxShadow: "none" }}
					/>
					<div className="text-center text-lg font-semibold mb-2">
						{images[current].alt}
					</div>
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex-1 flex flex-col items-center w-full"
				>
					<label
						htmlFor="feeling"
						className="mb-2 text-base font-medium"
					>
						Welke aanname heb je bij dit drankje? 
					</label>
					<input
						id="feeling"
						type="text"
						value={feeling}
						onChange={(e) => setFeeling(e.target.value)}
						className="rounded px-3 py-2 mb-4 w-full max-w-xs"
						style={{
							background: "#222",
							color: "#f5f5f5",
							border: "none",
						}}
						required
						autoFocus
						disabled={loading}
					/>
					<button
						type="submit"
						className="bg-white text-black px-4 py-2 sm:px-6 sm:py-2 rounded font-semibold w-full max-w-xs"
						style={{
							cursor: loading ? "not-allowed" : "pointer",
							opacity: loading ? 0.6 : 1,
						}}
						disabled={loading}
					>
						{loading ? "Versturen..." : "Verstuur"}
					</button>
					{loading && (
						<div className="mt-2 text-blue-400 text-sm animate-pulse">
							Bezig met versturen...
						</div>
					)}
					<div className="mt-4 text-sm text-gray-400">
						{current + 1} / {images.length}
					</div>
				</form>
			</div>
		</main>
	);
}