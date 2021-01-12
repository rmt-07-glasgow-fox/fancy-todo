function yesterday() {
  const today = new Date()
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1)

  const output = yesterday.toISOString().substring(0, 10)
  return output
}

// console.log(yesterday())
module.exports = yesterday
