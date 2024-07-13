import React, { useState } from 'react';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function Search({onSubmit}) {
	const [studentName, setStudentName] = useState('')
	const [joiningDate, setJoiningDate] = useState('')

	const handleSubmit = () => {
		const formData = {
			studentName: studentName,
			joiningDate: joiningDate
		}

		setStudentName('')
		setJoiningDate('')
		onSubmit(formData)
	}


	return (
				<div className="my-50 layout-row align-items-end justify-content-end">
						<label htmlFor="studentName">Student Name:
							<div>
								<input id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10" value={studentName} onChange={(e) => setStudentName(e.target.value)}/>
							</div>
						</label>
						<label htmlFor="joiningDate">Joining Date:
							<div>
								<input id="joiningDate" data-testid="joiningDate" type="date" className="mr-30 mt-10" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)}/>
							</div>
						</label>
						<button type="button" data-testid="addBtn" className="small mb-0" onClick={handleSubmit}>Add</button>
				</div>
	);
}

export default Search;