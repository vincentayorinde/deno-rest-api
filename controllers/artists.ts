import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { artists } from '../data.ts';
import { Artist } from '../types.ts';

// @desc Get all Artists
// @route GET /api/v1/artists
const getArtists = ( {response }: { response: any }) =>{
    response.body = {
        success: true,
        message: "Artists retrieved successfully",
        data: artists
    }
}

// @desc Get an Artists
// @route GET /api/v1/artists/:id
const getSingleArtist = ({ params, response }: { params: {id: string}, response: any }) => {
    const artist: Artist | undefined = artists.find(artist => artist.id === params.id)

    if(artist){
        response.status = 200
        response.body = {
            success: true,
            message: "Artist retrieved successfully",
            data: artist
        }
        }else{
        response.status = 404
        response.body = {
            success: false,
            data: "Artist not found"
        }
        }
}

// @desc Add an Artists
// @route POST /api/v1/artists/
const addArtist = async ({ request, response }: {request: any, response: any }) => {
    const body = await request.body()
    if(!request.hasBody){
        response.status = 400;
        response.body = {
            success: false,
            message: "Ensure to enter data"
        }
    }else {
        const artist: Artist = body.value
        artist.id = v4.generate();
        artists.push(artist)
        response.status = 201;
        response.body = {
            success: true,
            message: "Artist added successfully",
            data: artist
        }
    }
}

// @desc update an Artist
// @route PUT /api/v1/artists/:id
const updateArtist = async ({ params, request, response }: { params:{id: string}, request:any, response: any }) => {
    const artist: Artist | undefined = artists.find(artist => artist.id === params.id)

    if (artist) {
        const body = await request.body()
        const updateArtist: {name?: string; genre?: string; followers?:string} = body.value

        const updatedArtists = artists.map(artist => artist.id === params.id ? {...artist, ...updateArtist} : artist)

        response.status = 200;
        response.body = {
            success: true,
            message: "Artist updated successfully",
            data: updatedArtists
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            message: "Artist not found"
        }
    }
}

// @desc Remove an Artist
// @route DELETE /api/v1/artists/:id
const deleteArtist = ({ params, response }: { params: {id:string}, response: any }) => {
    const artist = artists.filter(artist => artist.id !== params.id)
    if (artist) {
        response.status = 200
        response.body = {
            success: true,
            message: "Artist removed successfully",
            data: artist
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            message: "Artist not found"
        }
    }
}




export { getArtists, getSingleArtist, addArtist, updateArtist, deleteArtist }