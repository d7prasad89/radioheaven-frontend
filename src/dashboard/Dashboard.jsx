import  { useEffect, useState } from "react";

function Dashboard() {

    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

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


  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Whoever has ears, let them hear - Matthew 11:15</h2>
        {/* name of each tab group should be unique */}

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="tabs tabs-box">
            <input type="radio" name="my_tabs_6" className="tab" aria-label="Songs" defaultChecked/>

                <div className="tab-content bg-base-100 border-base-300 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {records.length === 0 ? (
                      <div className="text-gray-500 col-span-4">No songs found.</div>
                    ) : (
                      records.map(record => (
                        <div key={record.id} className="card bg-base-200 shadow-md">
                          <div className="card-body">
                            <h3 className="card-title">{record.title}</h3>
                            <p>{record.description}</p>
                            <div className="card-actions justify-end">
                              <button className="btn btn-primary">Play</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
            

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Sermons"  />
            <div className="tab-content bg-base-100 border-base-300 p-6">Sermons</div>

            <input type="radio" name="my_tabs_6" className="tab" aria-label="Podcast" />
            <div className="tab-content bg-base-100 border-base-300 p-6">Podcast</div>
            </div>
      
    </div>
  );
}

export default Dashboard;
