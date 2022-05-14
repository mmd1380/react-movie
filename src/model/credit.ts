export default interface ICredit {
  id: number,
  cast: Array<ICreditDetail>
}

export interface ICreditDetail {
  adult: boolean,
  gender: number,
  id: number,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: number,
  order: number
}