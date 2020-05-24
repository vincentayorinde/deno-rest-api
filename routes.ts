import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getArtists, getSingleArtist, addArtist, updateArtist, deleteArtist } from './controllers/artists.ts'
const router = new Router();

router.get('/api/v1/welcome', ({ response }: { response: any }) => {
    response.body = {
        success: true,
        message: "Welcome to Artists API"
    }
});

router.get('/api/v1/artists', getArtists)
    .get('/api/v1/artists/:id', getSingleArtist)
    .post('/api/v1/artists', addArtist)
    .put('/api/v1/artists/:id', updateArtist)
    .delete('/api/v1/artists/:id', deleteArtist);



export default router;