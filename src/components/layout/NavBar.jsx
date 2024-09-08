import React from "react"
import { NavLink } from "react-router-dom"

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
			<div className="container-fluid" >
				<NavLink className="navbar-brand" to={"/"}>
				BIT Quiz Master
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/Login-Page"}>
								Login
							</NavLink>
							
						</li>
						<NavLink className="nav-link" to={"/Register"}>
								Sign Up
							</NavLink>

						
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
