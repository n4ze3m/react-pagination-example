import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export const SomePage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Button onClick={() => navigate(-1)}>Back</Button>
            
            <Typography.Title
            >Some Page</Typography.Title>
		</div>
	);
};
