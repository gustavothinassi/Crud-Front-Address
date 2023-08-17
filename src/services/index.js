import addressApi from './address'

export default function postServices () {
  const { register, delete_, getAll, update, getCep } = addressApi()

  return {
    register,
    delete_,
    getAll,
    update,
    getCep
  }
}
