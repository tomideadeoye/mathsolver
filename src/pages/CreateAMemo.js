import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import SideNav from "../components/nav";
import { makeStyles } from "@mui/styles";
import { PageTransition } from "../components/animations";
import moment from "moment";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { axiosCall } from "../services";
import { ThreeCircles } from "react-loader-spinner";

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
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({
		name: "",
		website: "",
		emailTo: "",
		pitch_uploaded: "",
	});

	const validityCheck = () => {
		if (
			values.name === "" ||
			values.emailTo === "" ||
			values.pitch_uploaded === ""
		) {
			return true;
		}
		return false;
	};

	const handleSubmit = async () => {
		setLoading(true);
		const response = await axiosCall("upload/", values, "POST");

		if (response.status >= 200 && response.status < 300) {
			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} else {
			setError(true);
			setLoading(false);
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
						value={values.name}
						onChange={(e) => setValues({ ...values, name: e.target.value })}
					/>
					<TextField
						hiddenLabel
						id="filled-hidden-label-normal"
						variant="standard"
						fullWidth
						placeholder="Company Website"
						value={values.website}
						onChange={(e) => setValues({ ...values, website: e.target.value })}
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

					<Stack direction={isMobile ? "column" : "row"} spacing={5}>
						<Button variant="outline" component="label" fullWidth>
							Upload Deck
							<input
								hidden
								accept="pdf/*"
								multiple
								type="file"
								onChange={(e) =>
									setValues({ ...values, pitch_uploaded: e.target.files[0] })
								}
							/>
						</Button>
						<Box width="100%" height="100%">
							{values.pitch_uploaded === ""
								? "No file yet!! let's see the amazing pitch you have!!"
								: `${values.pitch_uploaded.name} will be used to create your memo 🤞🏿`}
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
					{loading && (
						<ThreeCircles
							height="100"
							width="100"
							color="#4fa94d"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
							ariaLabel="three-circles-rotating"
							outerCircleColor=""
							innerCircleColor=""
							middleCircleColor=""
						/>
					)}
					{success && (
						<Alert severity="info">
							<AlertTitle>Congratualtions!!</AlertTitle>
							Your Memo for <strong>{values.name} </strong>
							will be sent to <strong>{values.emailTo} </strong>
							using information sourced from <strong>{values.website}</strong>
						</Alert>
					)}
					{error && (
						<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
							Your Memo for <strong>{values.name}</strong>
							has been sent to <strong>{values.emailTo}</strong>
							data was sourced from <strong>{values.website}</strong>
						</Alert>
					)}
				</Stack>
			</Stack>
		</PageTransition>
	);
};

export default CreateAMemo;
