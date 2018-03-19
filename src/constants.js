export const capFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.substring(1)

export const firstLetterIsUpper = str => /[A-Z]/.test(str)

export const USER_NAMES = process.env.USER_NAMES.split(',').map(user => {
  if (!firstLetterIsUpper(user)) {
    return capFirstLetter(user)
  }
  return user
})

export const USER_COLORS = process.env.USER_COLORS.split(',')

let colorMap = {}

function computeColorMap() {
  USER_NAMES.forEach((user, i) => {
    if (USER_COLORS[i]) {
      colorMap[user] = USER_COLORS[i]
    } else {
      colorMap[user] = 'black'
    }
  })

  return colorMap
}

export const COLOR_MAP = computeColorMap()
