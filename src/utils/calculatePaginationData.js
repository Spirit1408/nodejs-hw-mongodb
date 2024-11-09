export const calculatePaginationData = (count, perPage, page) => {
	const totalPages = Math.ceil(count / perPage);
	const hasNextPage = Boolean(page - totalPages);
	const hasPreviousPage = Boolean(page !== 1);

	return {
		page,
		perPage,
		totalItems: count,
		totalPages,
		hasPreviousPage,
		hasNextPage,
	};
};
