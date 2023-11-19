// ----------------------------------------------------
// Fonction gestion du Fetch
// ----------------------------------------------------

export const getData = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      const errorData = {
        status: res.status,
        statusText: res.statusText
      }
      throw new Error(JSON.stringify(errorData))
    }

    const result = await res.json()
    return result
  } catch (error) {
    // Gère les erreurs réseau
    if (error instanceof TypeError) {
      console.error('Erreur de réseau:', error.message)
      throw new Error('Erreur de réseau')
    }

    // Gère les erreurs non-HTTP
    console.error('Erreur getData:', error.message)

    throw new Error(
      "Une erreur inattendue s'est produite lors de la récupération des données."
    )
  }
}
