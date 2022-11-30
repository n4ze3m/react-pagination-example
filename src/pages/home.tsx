import { useQuery } from "@tanstack/react-query";
import { Table, Pagination, Skeleton, Button } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IQuery {
	page: number;
	size: number;
}

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

	const [query, setQuery] = React.useState<IQuery>({
		page: searchParams.get("page")
			? parseInt(searchParams.get("page") as string)
			: 1,
		size: searchParams.get("size")
			? parseInt(searchParams.get("size") as string)
			: 10,
	});

	const fetchData = async () => {
		const response = await axios.get(
			`https://api.instantwebtools.net/v1/passenger?page=${query.page}&size=${query.size}`,
		);
		return response.data;
	};

	const { data, status } = useQuery(["passengers", query], fetchData, {
		keepPreviousData: true,
	});

	return (
		<div>
			{status === "loading" ? <Skeleton /> : null}
			{status === "error" ? <div>Something went wrong</div> : null}
			{status === "success" ? (
				<div
					style={{
						margin: "0 auto",
						padding: "20px",
					}}
				>
					<Table
						pagination={false}
						dataSource={data.data}
						columns={[
							{
								title: "Name",
								dataIndex: "name",
								key: "name",
							},
							{
								title: "Trips",
								dataIndex: "trips",
								key: "trips",
							},
							{
								title: "Actions",
								render: (text, record) => (
									<Button type="primary"
                                    onClick={() => navigate("/some")}
                                    >View Details</Button>
								),
							},
						]}
					/>
					<Pagination
                        style={{ marginTop: "20px" }}
                    defaultCurrent={query.page} total={data.totalPages}
                    onChange={(page, pageSize) => {
                        setQuery({
                            page: page,
                            size: pageSize
                        })
                        setSearchParams({
                            page: page.toString(),
                            size: pageSize.toString()
                        })
                    }} />
				</div>
			) : null}
		</div>
	);
};
