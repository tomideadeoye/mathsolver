import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import SideNav from "../components/nav";
import { makeStyles } from "@mui/styles";
import { PageTransition } from "../components/animations";
import moment from "moment";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.default,
		height: "100vh",
		justifyContent: "space-between",
	},

	dashboard: {
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
	},

	itemBox: {
		backgroundColor: theme.palette.white.main,
		minHeight: "25rem",
		borderRadius: "1rem",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: "1rem",
		padding: "2rem 0rem",
		"&:hover": {
			boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
		},
		[theme.breakpoints.down("md")]: {
			height: "fit-content",
			minHeight: "22rem",
		},
	},
	description: theme.typography.h4,
	title: theme.typography.h3,
	loans: theme.typography.h1,
	day: theme.typography.h3,
	icon: {
		width: "100%",
		maxHeight: "150px",
		[theme.breakpoints.down("md")]: {
			width: "60%",
			height: "100px",
		},
	},
}));

const CreateAMemo = () => {
	const styles = useStyles();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const [activePage, setActivePage] = useState("Home");
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [success, setSuccess] = useState(false);
	const [values, setValues] = useState({
		companyName: "",
		companyWebsite: "",
		emailTo: "",
		deck: "",
	});

	const validityCheck = () => {
		if (
			values.companyName === "" ||
			values.emailTo === "" ||
			values.deck === ""
		) {
			return true;
		}
		return false;
	};

	const handleSubmit = () => {
		// make a post request to the backend

		const response = "success";

		if (response === "success") {
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} else {
			setError(true);
		}
	};

	return (
		<PageTransition>
			<Stack
				direction={isMobile ? "column" : "row"}
				className={styles.container}
			>
				<SideNav activePage={activePage} setActivePage={setActivePage} />
				<Stack p={8} className={styles.dashboard}>
					<h1 className={styles.loans}>Create a Memo!</h1>

					<p className={styles.day}>
						{moment().format("dddd")}, {moment().format("MMMM Do YYYY")}
					</p>

					<TextField
						hiddenLabel
						id="filled-hidden-label-normal"
						variant="standard"
						fullWidth
						placeholder="Company Name"
						value={values.companyName}
						onChange={(e) =>
							setValues({ ...values, companyName: e.target.value })
						}
					/>
					<TextField
						hiddenLabel
						id="filled-hidden-label-normal"
						variant="standard"
						fullWidth
						placeholder="Company Website"
						value={values.companyWebsite}
						onChange={(e) =>
							setValues({ ...values, companyWebsite: e.target.value })
						}
					/>

					<TextField
						hiddenLabel
						id="filled-hidden-label-normal"
						variant="standard"
						fullWidth
						placeholder="Send draft to ex: tomideadeoye@gmail.com"
						value={values.emailTo}
						onChange={(e) => setValues({ ...values, emailTo: e.target.value })}
					/>

					<Stack direction={"row"} spacing={5}>
						<Button variant="outline" component="label" fullWidth>
							Upload Deck
							<input
								hidden
								accept="pdf/*"
								multiple
								type="file"
								onChange={(e) =>
									setValues({ ...values, deck: e.target.files[0] })
								}
							/>
						</Button>
						<Box width="100%" height="100%">
							{values.deck === ""
								? "No file yet!! let's see the amazing deck you have!!"
								: `${values.deck.name} will be used to create your memo 🤞🏿`}
						</Box>
					</Stack>

					<Button
						variant="outline"
						onClick={() => handleSubmit()}
						component="label"
						fullWidth
						color="primary"
						disabled={validityCheck()}
					>
						Process Memo
					</Button>
					{success && (
						<Alert severity="info">
							<AlertTitle>Congratualtions!!</AlertTitle>
							Your Memo for <strong>{values.companyName} </strong>
							will be sent to <strong>{values.emailTo} </strong>
							using information sourced from{" "}
							<strong>{values.companyWebsite}</strong>
						</Alert>
					)}
					{error && (
						<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
							Your Memo for <strong>{values.companyName}</strong>
							has been sent to <strong>{values.emailTo}</strong>
							data was sourced from <strong>{values.companyWebsite}</strong>
						</Alert>
					)}
				</Stack>
			</Stack>
		</PageTransition>
	);
};

export default CreateAMemo;
