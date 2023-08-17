import { api } from 'src/boot/axios'

export default function addressApi () {
  const register = async ({ cep, logradouro, bairro, cidade, uf }) => {
    const response = await api.post('/api/address', {
      cep,
      logradouro,
      bairro,
      cidade,
      uf
    })
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText

      }
    }
    return {
      data: response.data,
      errors
    }
  }

  const getAll = async () => {
    const response = await api.get('/api/address')

    return { data: response.data }
  }

  const delete_ = async ({ id }) => {
    const response = await api.delete(`/api/address/${id}`, {})
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText

      }
    }
    return {
      data: response.data,
      errors
    }
  }

  const update = async ({ id, cep, logradouro, bairro, cidade, uf }) => {
    const response = await api.put(`/api/address/${id}`, {
      cep,
      logradouro,
      bairro,
      cidade,
      uf
    })
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText

      }
    }
    return {
      data: response.data,
      errors
    }
  }

  const getCep = async ({ search }) => {
    const response = await api.get(`/api/getCep/${search}`, {})
    let errors = null
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText

      }
    }
    return {
      data: response.data,
      errors
    }
  }
  return {
    register,
    update,
    delete_,
    getAll,
    getCep
  }
}
