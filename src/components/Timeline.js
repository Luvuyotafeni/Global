import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timeline.css';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php');
        const data = response.data;

        // Navigate to the 'Timeline' array in the JSON structure
        if (data && data.Timeline && Array.isArray(data.Timeline)) {
          setTimelineData(data.Timeline);
        } else {
          console.error('Timeline array not found or is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!timelineData.length) {
    return <div>No timeline data available</div>;
  }

  return (
    <div className="timeline-container">
      <h1>Timeline</h1>
      {timelineData.map((item) => (
        <div key={item.Id} className="timeline-item">
          <h2>{item.Title}</h2>
          <p><strong>Episode:</strong> {item.Episode}</p>
          <p><strong>Description:</strong> {item.Description || 'No description available.'}</p>
          <p><strong>Remote ID:</strong> {item.RemoteId}</p>
          <p><strong>Status:</strong> {item.Status}</p>
          <p><strong>Is Active:</strong> {item.isActive ? 'Yes' : 'No'}</p>
          <p><strong>Create Date:</strong> {item.CreateDate}</p>
          <p><strong>Media Name:</strong> {item.MediaName}</p>
          <p><strong>Category:</strong> {item.Category}</p>
          <p><strong>Epoch:</strong> {item.Epoch}</p>
          <p><strong>Audio Size:</strong> {item.AudioSize} bytes</p>
          <p><strong>Media:</strong> {item.Media}</p>

          <div className="media-container">
            {item.Icon && (
              <img
                src={`https://arthurfrost.qflo.co.za/${item.Icon}`}
                alt={`Icon for ${item.Title}`}
              />
            )}
            {item.Image && (
              <img
                src={`https://arthurfrost.qflo.co.za/${item.Image}`}
                alt={`Image for ${item.Title}`}
              />
            )}
            {item.Audio && (
              <audio controls>
                <source src={`https://arthurfrost.qflo.co.za/${item.Audio}`} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
