import React, { useEffect, useState, useRef } from "react";


function Dashboard() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);
    const [artistFilter, setArtistFilter] = useState('All');
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Fetch data from the backend API
    useEffect(() => {
        fetch('http://localhost:8080/api/songs/all')
            .then(response => response.json())
            .then(data => setRecords(data))
            .catch(error => {
                
                console.error('Error fetching data:', error);
                setError('Failed to fetch records');
            });
    }, []);

    function toggleFavorite(recordId) {
        console.log('Toggling favorite for record ID:', recordId);
        // Here you would typically make an API call to update the favorite status in the backend
        // For demonstration, we'll just toggle the local state
        // setRecords(prevRecords =>
        //     prevRecords.map(record =>
        //         record.id === recordId ? { ...record, favorite: !record.favorite } : record
        //     )
        // );
        
        const updatedRecord = records.find(record => record.id === recordId);
        console.log('Found record:', updatedRecord);
        if (!updatedRecord) {
            console.error('Record not found for ID:', recordId);
            setError('Record not found');
            return;
        }
        fetch(`http://localhost:8080/api/songs/update/${recordId}`, { method: 'PUT', body: JSON.stringify({ ...updatedRecord, isFavorite: !updatedRecord.isFavorite }), headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(updatedRecord => {
                setRecords(prevRecords =>
                    prevRecords.map(record =>
                        record.id === recordId ? updatedRecord : record
                    )
                );
            })
            .catch(error => {
                console.error('Error toggling favorite:', error);
                setError('Failed to toggle favorite status');
            });
    } 


  // Get unique artists for filter dropdown
  const artists = Array.from(new Set(records.map(r => r.artist))).filter(Boolean);

  // Filter records by artist
  const filteredRecords = artistFilter === 'All'
    ? records
    : records.filter(record => record.artist === artistFilter);

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Whoever has ears, let them hear - Matthew 11:15</h2>
      {/* name of each tab group should be unique */}

      {error && <div className="text-red-500 mb-4">{error}</div>}



      <div className="tabs tabs-box">
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Songs" defaultChecked/>

        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <label htmlFor="artist-filter" className="font-semibold">Filter by Artist:</label>
            <select
              id="artist-filter"
              className="select select-bordered"
              value={artistFilter}
              onChange={e => setArtistFilter(e.target.value)}
            >
              <option value="All">All</option>
              {artists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
          </div>
    <div className="overflow-x-auto">
    <table className="table">
        {/* head */}
        <thead>
        <tr>
            <th>Play</th>
            <th>Name</th>
            <th>Album</th>
            <th>Length In Seconds</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
            {/* rows*/}

              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-gray-500 text-center">No songs found.</td>
                </tr>
              ) : (
                filteredRecords.map(record => (
                <React.Fragment key={record.id}>
                  <tr>
                    <th>
                      <button
                        className={`btn btn-primary btn-xs ${currentSong && currentSong.title === record.title ? 'btn-active' : ''}`}
                        title={currentSong && currentSong.title === record.title ? (isPlaying ? 'Pause' : 'Play') : 'Play'}
                        onClick={() => {
                          if (currentSong && currentSong.title === record.title) {
                            // Toggle play/pause for current song
                            if (audioRef.current) {
                              if (isPlaying) {
                                audioRef.current.pause();
                                setIsPlaying(false);
                              } else {
                                audioRef.current.play();
                                setIsPlaying(true);
                              }
                            }
                          } else {
                            setCurrentSong(record);
                            setIsPlaying(true);
                          }
                        }}
                        disabled={!record.title}
                      >
                        {currentSong && currentSong.title === record.title && isPlaying ? (
                          // Pause icon
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                          </svg>
                        ) : (
                          // Play icon
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9-15-9z" />
                          </svg>
                        )}
                      </button>
                    </th>
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{record.title}</div>
                                <div className="text-sm opacity-50">{record.artist}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        {record.album ? record.album : 'N/A'}
                        <br />
                        <span className="badge badge-ghost badge-sm flex items-center gap-1 hover: cursor-pointer" onClick={() => {
                            toggleFavorite(record.id);
                        } } >
                            Favorite: 
                          {record.isFavorite ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ef4444" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" />
                            </svg>
                          )}
                        </span>
                    </td>
                    <td>{record.lengthInSeconds}</td>
                    <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                </React.Fragment>
              ))
            )}

    </tbody>
  </table>
</div>


        </div>

        <input type="radio" name="my_tabs_6" className="tab" aria-label="Sermons"  />
        <div className="tab-content bg-base-100 border-base-300 p-6">Sermons</div>

        <input type="radio" name="my_tabs_6" className="tab" aria-label="Podcast" />
        <div className="tab-content bg-base-100 border-base-300 p-6">Podcast</div>
      </div>
    {currentSong && (
      <div className="fixed bottom-0 left-0 w-full bg-base-200 border-t border-base-300 p-4 flex items-center justify-center gap-4 z-50">
        <span className="font-semibold">Now Playing:</span>
        <span>{currentSong.title} {currentSong.artist && <span className="text-sm opacity-60">by {currentSong.artist}</span>}</span>
        <audio
          ref={audioRef}
          src={"/src/assets/songs/" + encodeURIComponent(currentSong.title) + ".mp3"}
          controls
          autoPlay={isPlaying}
          className="max-w-lg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    )}
    </div>
  );
}

export default Dashboard;
