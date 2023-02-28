import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import SideNav from "../components/nav";
import { makeStyles } from "@mui/styles";
import { dataBox } from "../appTextData";
import { AnimationMakerButton, PageTransition } from "../components/animations";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: theme.palette.background.default,
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

const LoanCategory = () => {
	const styles = useStyles();
	const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
	const [activePage, setActivePage] = React.useState("Home");
	return (
		<PageTransition>
			<Stack
				direction={isMobile ? "column" : "row"}
				className={styles.container}
			>
				<SideNav activePage={activePage} setActivePage={setActivePage} />
				<Stack p={3} spacing={3}>
					<h1 className={styles.loans}>{activePage}</h1>

					<Stack direction="row" alignItems="center">
						<p className={styles.day}>{moment().format("dddd")}</p>
						<span className={styles.date}>
							, {moment().format("MMMM Do YYYY")}
						</span>
					</Stack>

					<Box>
						<Grid
							container
							spacing={{
								xs: 2,
								md: 4,
							}}
							sx={{
								height: "100%",
							}}
						>
							{dataBox.map((item, index) => (
								<Grid item xs={6} sm={6} md={4} lg={3} key={index}>
									<AnimationMakerButton>
										<Stack className={styles.itemBox}>
											<Box
												component="img"
												className={styles.icon}
												src={item.icon}
											/>
											<Box
												textAlign="center"
												className={styles.title}
												sx={isMobile && { fontSize: ".8rem" }}
											>
												{item.title}
											</Box>
											<Box
												component="p"
												className={styles.description}
												maxWidth="80%"
												textAlign="center"
												sx={
													isMobile && { fontSize: ".8rem", lineHeight: "20px" }
												}
											>
												{item.description}
											</Box>
										</Stack>
									</AnimationMakerButton>
								</Grid>
							))}
						</Grid>
					</Box>
				</Stack>
			</Stack>
		</PageTransition>
	);
};

export default LoanCategory;
