export const getLastTwoWeeks = () => {
  let dates = []
  let today = new Date()

  for (let i = 0; i < 14; i++) {
    let date = new Date()
    date.setDate(today.getDate() - i)

    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')

    dates.push(`${year}-${month}-${day}`)
  }

  return dates.reverse()
}
