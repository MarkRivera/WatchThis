import React from "react";
import "./Loading.css";

function Loading() {
	return (
		<div className="d-flex text-light justify-content-center spin">
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Loading;
