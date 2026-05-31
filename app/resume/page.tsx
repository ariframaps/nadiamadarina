export default function ResumePage() {
	return (
		<div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
			{/* Header like Notion */}
			<div className="mb-6 text-center">
				<h1 className="text-2xl font-semibold">Resume</h1>
				<p className="text-sm text-gray-500">Always updated automatically</p>
			</div>

			{/* Document container */}
			<iframe src="https://docs.google.com/document/d/e/2PACX-1vRxg69nlESvzttn7nZd-UccX3ZKW9Ksb8ZIbkBawxIU19wfYA6uuu_WUhY1jHHxzA/pub?embedded=true"></iframe>
		</div>
	);
}
