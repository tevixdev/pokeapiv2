//El día de mañana si se quiere agregar metodos distintos a get, headers, etc, simplemente se agregan como propiedades nombradas en la función
export const callApi = async ({url}) => {
  const response = await fetch(url)
  const data = await response.json()
  return data 
}

export default callApi
