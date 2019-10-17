import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail, VideoList}  from './components';
import youtube from './api/youtube';

const App = () => {
    const [ videos, setVideos ] = useState([]);
    const [ selectedVideo, setSelectedVideo ] = useState(null);
    // component mounted
    useEffect(() => {
        handleSubmit('ES6 and ES7')
    });

    return (
        <Grid style={{ justifyContent: 'center' }} container spacing={10}>
            <Grid item xs={11}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onFormSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={7}>
                        <VideoDetail video={selectedVideo}/>
                    </Grid>
                    <Grid item xs={5}>
                        <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )

    async function handleSubmit(searchTerm) {
        const { data: { items: videos } } = await youtube.get("search", {
            params: {
                part: "snippet",
                maxResults: 5,
                key: process.env.REACT_APP_API_KEY,
                q: searchTerm
            }
        })

        setVideos(videos);
        setSelectedVideo(videos[0]);
    }
};

export default App;