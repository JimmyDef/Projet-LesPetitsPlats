export const capitalizeFirstLetter = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
}

export const clearSearchInput = (inputName) => {
  document.getElementById(`${inputName}-search`).value = ''
}

export const filterInputXss = (input) => {
  return input.replace(/[<>&"/=]/g, '')
}
