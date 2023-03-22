import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@mui/styles";
import { PageTransition } from "../components/animations";
import mathsteps from "mathsteps";
import Header from "../components/header";

import ErrorBoundary from "../utils/errorBoundry";

const useStyles = makeStyles(() => ({
	container: {
		backgroundImage: `url(${"./images/wallpaper.png"})`,
		backgroundSize: "contain",

		height: "100vh",
		justifyContent: "space-between",
	},

	dashboard: {
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
	},

	chatSection: {
		padding: "1rem 3rem",
		backgroundColor: "#fff",
		borderRadius: "3rem",
	},
}));

const SolveSomeMath = () => {
	const styles = useStyles();
	const [problem, setProblem] = useState("");

	const [conversation, setConversation] = useState([
		{
			type: "bot",
			text: [
				"Hi, I am Tomide.",
				"I am excited to play some math games with you",
				"Type in something like this: 2x + 3x = 35",
				"I will try to solve it for you ",
			],
		},
	]);

	const validityCheck = () => {
		setConversation((prev) => [
			...prev,
			{
				type: "user",
				text: problem,
			},
		]);
		// check if tosimplify or tosolve
		let steps = "";
		let stepByStep = [];
		let answer = "";
		try {
			if (problem.includes("=")) {
				steps = mathsteps.solveEquation(problem);
				answer = steps[steps.length - 1].newEquation.ascii();
				stepByStep = [];

				steps.forEach((step) => {
					if (step.substeps.length === 0) {
						stepByStep.push(
							`${step.changeType
								.replaceAll("_", " ")
								.toUpperCase()}: ${step.newEquation.ascii()} `
						);
					} else {
						stepByStep.push(
							`${step.changeType.replaceAll("_", " ").toUpperCase()}`
						);
					}

					step.substeps.forEach((substep, index) => {
						stepByStep.push(
							`(${index + 1}.) ${substep.changeType
								.replaceAll("_", " ")
								.toLowerCase()}: ${substep.newEquation.ascii()}	`
						);
					});
				});
			} else {
				steps = mathsteps.simplifyExpression(problem);

				answer = steps[steps.length - 1].newNode._toString();

				steps[0].substeps.forEach((substep, index) => {
					stepByStep.push(
						`(${index + 1}.) ${substep.changeType
							.replaceAll("_", " ")
							.toLowerCase()}: ${substep.newNode._toString()}	`
					);
				});
			}
			setConversation((prev) => [
				...prev,
				{
					type: "bot",
					text: answer,
				},
				{
					type: "bot",
					text: [
						"Here's how I got it: 🤯",
						`From your question: ${problem}`,
						...stepByStep,
					],
				},
			]);
		} catch (error) {
			setConversation((prev) => [
				...prev,
				{
					type: "bot",
					text: [
						"I am sorry, I could not help you with that",
						"🫣  Try a math expression like 2x + 3x = 35",
					],
				},
			]);
		}
		setProblem("");
	};

	const handleProblem = (e) => {
		setProblem(e.target.value);
	};

	return (
		<ErrorBoundary>
			<PageTransition>
				<Stack className={styles.container}>
					<Header />
					<Stack px={2} py={1} className={styles.dashboard} spacing={1}>
						<Stack
							sx={{
								height: "75vh",
								overflowY: "scroll",
							}}
						>
							{conversation.map((msg, index) => {
								return (
									<Fragment key={index}>
										<ChatMsg
											side={msg.type === "user" ? "right" : "left"}
											avatar={
												msg.type === "user" ? "" : "./images/twitter.jpeg"
											}
											messages={
												Array.isArray(msg.text) ? [...msg.text] : [msg.text]
											}
										/>
										{index == 0 && (
											<img
												src="https://media.giphy.com/media/W35DnRbN4oDHIAApdk/giphy.gif"
												alt="gif"
												height={150}
												style={{ marginLeft: "60px" }}
												width={150}
											/>
										)}
									</Fragment>
								);
							})}
						</Stack>

						<Stack direction="row" spacing={2} className={styles.chatSection}>
							<TextField
								hiddenLabel
								id="filled-hidden-label-normal"
								variant="standard"
								fullWidth
								placeholder="Your math problem"
								value={problem}
								onChange={handleProblem}
								color="success"
							/>
							<IconButton
								onClick={validityCheck}
								color="success"
								component="send"
								role="send"
							>
								<SendIcon />
							</IconButton>
						</Stack>
					</Stack>
				</Stack>
			</PageTransition>
		</ErrorBoundary>
	);
};

export default SolveSomeMath;
