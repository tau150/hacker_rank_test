import React from 'react';

function ResidentsList({students}) {
	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				{students.map(student => {
					return (
					<li key={student.name} className="slide-up-fade-in">
						{student.name}
					</li>
					)
				})}
			</ul>
		</div>
	);
}

export default ResidentsList;