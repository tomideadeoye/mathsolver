/* eslint-disable react/prop-types */
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
					duration: 1,
					ease: "easeIn",
					times: [0, 0.2, 0.8, 1],
					repeatDelay: 1,
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
