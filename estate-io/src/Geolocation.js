export function saveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

export const fetchCityAndCountry = async (latitude, longitude, setLocation) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village;
    const country = data.address.country;
    setLocation(`${city}, ${country}`);
  } catch (error) {
    console.error('Error fetching city and country:', error);
  }
};