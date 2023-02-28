/* eslint-disable react/prop-types */
import { useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export function PageTransition({ children }) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 5 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 2,
					ease: "easeIn",
					times: [0, 0.2, 0.8, 1],
					// repeat: Infinity,
					repeatDelay: 1,
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export function AnimationMakerButton({ children }) {
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	return (
		<motion.div
			className="box"
			whileHover={!isMobile && { scale: 1.1 }}
			whileTap={!isMobile && { scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			{children}
		</motion.div>
	);
}

export function LogoAnimator({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			whileHover={{
				opacity: 1,
				scale: 1,
			}}
		>
			{children}
		</motion.div>
	);
}
