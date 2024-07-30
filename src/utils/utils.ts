const { DateTime } = require('luxon')

export function setTitle(input: number) {
  if (input <= 4 && input > 3.5) {
    return `S1`
  } else if (input <= 3.5 && input > 2.5) {
    return `S2`
  } else if (input <= 2.5 && input > 1.5) {
    return `S3`
  } else if (input <= 1.5 && input >= 0) {
    return `N`
  } else return `BL `
}

export function setBg(input: number) {
  if (input <= 4 && input > 3.5) {
    return 'bg-s1 p-1 rounded-md text-white'
  } else if (input <= 3.5 && input > 2.5) {
    return 'bg-s2 p-1 rounded-md text-white'
  } else if (input <= 2.5 && input > 1.5) {
    return 'bg-s3 p-1 rounded-md text-white'
  } else if (input <= 1.5 && input >= 0) {
    return 'bg-n p-1 rounded-md text-white'
  } else return 'bg-[#6f6f6f] p-1 rounded-md text-white'
}

export function setResultTitle(input: number) {
  if (input <= 4 && input > 3.5) {
    return 'text-2xl text-center font-black my-7 p-5 bg-s1 text-white rounded-xl'
  } else if (input <= 3.5 && input > 2.5) {
    return 'text-2xl text-center font-black my-7 p-5 bg-s2 text-white rounded-xl'
  } else if (input <= 2.5 && input > 1.5) {
    return 'text-2xl text-center font-black my-7 p-5 bg-s3 text-white rounded-xl'
  } else if (input <= 1.5 && input >= 1) {
    return 'text-2xl text-center font-black my-7 p-5 bg-n text-white rounded-xl'
  } else if (input == 0) {
    return 'text-2xl text-center font-black my-7 p-5 bg-n text-white rounded-xl'
  } else return 'text-2xl text-center font-black my-7 p-5 bg-[#6f6f6f] text-white rounded-xl'
}

export function setResultFactor(input: number) {
  if (input <= 4 && input > 3.5) {
    return 'card w-auto bg-s1 shadow-xl mx-1 text-white'
  } else if (input <= 3.5 && input > 2.5) {
    return 'card w-auto bg-s2 shadow-xl mx-1 text-white'
  } else if (input <= 2.5 && input > 1.5) {
    return 'card w-auto bg-s3 shadow-xl mx-1 text-white'
  } else if (input <= 1.5 && input >= 1) {
    return 'card w-auto bg-n shadow-xl mx-1 text-white'
  } else if (input == 0) {
    return 'card w-auto bg-n shadow-xl mx-1 text-white'
  } else return 'card w-auto bg-[#6f6f6f] shadow-xl mx-1 text-white'
}

export function landColor(input: number) {
  if (input >= 1 && input <= 1.75) {
    return { fillColor: '#ce5050', color: '#fff' }
  } else if (input > 1.75 && input <= 2.5) {
    return { fillColor: '#e99b5C', color: '#fff' }
  } else if (input > 2.5 && input <= 3.25) {
    return { fillColor: '#ffcd42', color: '#fff' }
  } else if (input > 3.25 && input <= 4) {
    return { fillColor: '#10a063', color: '#fff' }
  } else if (input == 0) {
    return { fillColor: '#10a063', color: '#fff' }
  } else {
    return { fillColor: '#6f6f6f', color: '#fff' }
  }
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const formatMillis = (seconds: number, format: string) =>
  DateTime.fromMillis(seconds).setLocale('id').toFormat(format)

export function isExpired(input: Number) {
  const now = DateTime.local().toMillis()
  if (input === null) return false
  if (input > now) return true
  return false
}

export function capitalizeFirstLetter(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function capitalizeEveryWord(str: string): string {
  const words = str.split(' ')
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  return capitalizedWords.join(' ')
}

export const formatRouteName = (route: string) => {
  if (route === '/') {
    route = '/home'
  }

  const trimmedRoute = route.startsWith('/') ? route.slice(1) : route

  const formattedRoute = trimmedRoute
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return formattedRoute
}
