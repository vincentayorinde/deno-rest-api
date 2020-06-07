import { client } from '../data.ts';

// @desc Get all Artists
// @route GET /api/v1/artists
const getArtists = async ({ response }: { response: any }) => {
    try {
        await client.connect();

        const result = await client.query('SELECT * FROM artists');
        const artists = new Array();

        result.rows.map((artist) => {
            let obj: any = new Object();
            result.rowDescription.columns.map((el, i) => {
                obj[el.name] = artist[i];
            });
            artists.push(obj);
        });

        response.status = 200;
        response.body = {
            success: true,
            count: result.rowCount,
            message: 'Artists retrieved successfully',
            data: artists,
        };
    } catch (error) {
        console.log('the error', error)
        response.status = 500;
        response.body = {
            success: false,
            message: error.toString(),
        };
    } finally {
        await client.end();
    }
};

// @desc Get an Artists
// @route GET /api/v1/artists/:id
const getSingleArtist = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    try {
        await client.connect();
        const result = await client.query(
            'SELECT * FROM artists WHERE id = $1',
            params.id
        );

        if (result.rows.toString() === '') {
            response.status = 404;
            response.body = {
                success: false,
                message: `No artist found with id ${params.id}`,
            };
            return;
        } else {
            const artist: any = new Object();
            result.rows.map((a) => {
                result.rowDescription.columns.map((el, i) => {
                    artist[el.name] = a[i];
                });
            });
            response.body = {
                success: true,
                message: 'Artist Retrived Successfully',
                data: artist,
            };
        }
    } catch (error) {
        response.status = 500;
        response.body = {
            success: false,
            message: error.toString(),
        };
    } finally {
        await client.end();
    }
};

// @desc Add an Artists
// @route POST /api/v1/artists/
const addArtist = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    const body = await request.body();
    const artist = body.value;
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            message: 'Ensure to enter data',
        };
    } else {
        try {
            await client.connect();
            const result = await client.query(
                'INSERT INTO artists(name,genre,followers,net_worth) VALUES($1,$2,$3,$4)',
                artist.name,
                artist.genre,
                artist.followers,
                artist.net_worth
            );
            response.status = 201;
            response.body = {
                success: true,
                message: 'Artist added successfully',
                data: artist,
            };
        } catch (error) {
            response.status = 500;
            response.body = {
                success: false,
                message: error.toString(),
            };
        } finally {
            await client.end();
        }
    }
};

// @desc update an Artist
// @route PUT /api/v1/artists/:id
const updateArtist = async ({
    params,
    request,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    await getSingleArtist({ params: { id: params.id }, response });

    if (response.status === 404) {
        response.status = 404;
        response.body = {
            success: false,
            message: response.body.message,
        };
        return;
    } else {
        const body = await request.body();
        const artist = body.value;
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: 'Ensure to enter data',
            };
        } else {
            try {
                await client.connect();
                const result = await client.query(
                    'UPDATE artists SET name=$1,genre=$2,followers=$3,net_worth=$4 WHERE id=$5',
                    artist.name,
                    artist.genre,
                    artist.followers,
                    artist.net_worth,
                    params.id
                );
                response.status = 200;
                response.body = {
                    success: true,
                    message: 'Artist updated successfully',
                    data: artist,
                };
            } catch (error) {
                response.status = 500;
                response.body = {
                    success: false,
                    message: error.toString(),
                };
            } finally {
                await client.end();
            }
        }
    }
};

// @desc Remove an Artist
// @route DELETE /api/v1/artists/:id
const deleteArtist = async ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    await getSingleArtist({ params: { id: params.id }, response });
    if (response.status === 404) {
        response.status = 404;
        response.body = {
            success: false,
            message: response.body.message,
        };
    } else {
        try {
            await client.connect();
            const result = await client.query(
                'DELETE FROM artists WHERE id=$1',
                params.id
            );
            response.status = 204;
            response.body = {
                success: true,
                message: `Artist with the id ${params.id} Successfully deleted`,
            };
        } catch (error) {
            response.status = 500;
            response.body = {
                success: false,
                message: error.toString(),
            };
        } finally {
            await client.end();
        }
    }
};

export { getArtists, getSingleArtist, addArtist, updateArtist, deleteArtist };
