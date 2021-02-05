export const getSubdomain = () => {
    let hostname = window.location.hostname.toLowerCase()
    return hostname
    
    // const hostnameSections = hostname.split(".")
    // const first = hostnameSections[0]
    // if (reserved.includes(first)) {
    //   return hostnameSections[1]
    // } else {
    //   return first
    // }
  }