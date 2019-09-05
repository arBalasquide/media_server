// Date returns hour/min/seconds as they are i.e 1s is returned as 1
// So this is to add 0 to make it i.e 01, for aesthetics

let prepend_zero = function(str){
  if(str < 10)return '0'+str
  else return str
}

let get_time = function(){
  let date = new Date()
  
  let hour = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds()
  let time = ''

  hour = prepend_zero(hour)
  minutes = prepend_zero(minutes)
  seconds = prepend_zero(seconds)

  time = `${hour}:${minutes}:${seconds}`

  return time
}

// Adds timestamp and logs the file into the log.txt file

exports.log = function(msg){
  let current_time = get_time()
  
  let formatted_msg = `[${current_time}] ` + msg
  console.log(formatted_msg)

}
