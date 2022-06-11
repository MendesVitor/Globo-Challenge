import {Client} from 'pg'

export const client = (string: any) => {
  return new Client(string)
}
