import React, { useState } from 'react';
import ResidentsList from './ResidentsList';
import Search from './Search';
import Error from './Error';
import { ERROR_TYPES, getErrorMessage } from "../utils/errorMessages"

const LOCAL_STORAGE_KEY = 'residents'

function Main({STUDENTS: students}) {
  const [error, setError] = useState({isError: false, message: null })
  const [presentStudents, setPresentStudents] = useState( () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [])

  const handleSubmitStudentForm = (formData) => {
    const { joiningDate, studentName } = formData;

    if(studentName === '' || joiningDate === '' ){
      setError({isError: true, message: getErrorMessage(ERROR_TYPES.UNCOMPLETED_FIELDS)})
      return
    }

    if(presentStudents.find(student => student.name === studentName)) {
      setError({isError: true, message: getErrorMessage(ERROR_TYPES.ALREADY_EXISTS, studentName)})
      return
    }

    const validStudent = students?.find(student => student.name.toLowerCase() === studentName.toLowerCase())

    if(!validStudent){
      setError({isError: true, message: getErrorMessage(ERROR_TYPES.INVALID_STUDENT, studentName)})
      return
    }

    const validityDate = new Date(validStudent.validity)
    const isDateExpired = new Date(joiningDate) > validityDate

    if(isDateExpired){
      setError({isError: true, message: getErrorMessage(ERROR_TYPES.EXPIRED_VALIDITY, studentName)})
      return
    }

    const updatedPresentStudents =  [...presentStudents, { name: formData.studentName }]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPresentStudents))
    setPresentStudents(updatedPresentStudents)

    setError({isError: false, message: null})

  }

  return (
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search onSubmit={handleSubmitStudentForm} />
        {error.isError && <Error message={error.message}/>}
        <ResidentsList students={presentStudents}/>
      </div>
  );
}

export default Main;