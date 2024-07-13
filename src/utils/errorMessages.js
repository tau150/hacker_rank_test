
export const ERROR_TYPES = {
  UNCOMPLETED_FIELDS: 'UNCOMPLETED_FIELDS',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  INVALID_STUDENT: 'INVALID_STUDENT',
  EXPIRED_VALIDITY: 'EXPIRED_VALIDITY'
}

export const getErrorMessage = (type, name) => {

  switch(type){
    case ERROR_TYPES.ALREADY_EXISTS:
      return `Sorry, ${name} is already present in the residents list!`

    case ERROR_TYPES.INVALID_STUDENT:
      return `Sorry, ${name} is not a verified student!`

    case ERROR_TYPES.UNCOMPLETED_FIELDS:
      return 'Please enter all the fields'

    case ERROR_TYPES.EXPIRED_VALIDITY:
      return `Sorry, ${name}'s validity has Expired!`

    default:
      return 'Some inputs are invalid'
  }

}