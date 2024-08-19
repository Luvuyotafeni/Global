// src/services/timelineService.js
import axios from 'axios';

const API_URL = 'https://arthurfrost.qflo.co.za/php/getTimeline.php';

export const getTimelineData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
