const orign = "https://podcast-api.netlify.app/";

export const showAllShows = async() => {
    const response = await fetch(orign+"shows")
    return response.json()
}

export const getSeasons = async(id)=> {
    const response = await fetch(orign+"id/"+id)
    return response.json()

}

