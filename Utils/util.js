import dayjs from "dayjs";

import { redisClient } from '../app'
import { ERRORS } from "../Constants"

/**
 * @param {RESPONSE} res response object
 * @param {NUMBER} status status code
 * @param {STRING} message message that you want to send to the user
 * @param {OBJECT} data data if anything you want to send to the front end. By default set to empty object
 * @param {ANY} error error message or object or any thing default set to null
 */
export const sendResponse = (res, status, message, data = {}, error = null) => {
  return res.status(status).json(
    {
      status,
      message,
      data,
      error: ERRORS[error] ? ERRORS[error] : error
    }
  )
}

export const redisOperation = async (param, operation) => {
  return await new Promise((resolve, reject) => redisClient[operation](param, (err, data) => {
    if(err){
      reject(err)
    }else{
      resolve(data)
    }
  }))
}
