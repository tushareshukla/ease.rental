import { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function AddProperty() {
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resole, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransfered / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolvePath(downloadURL);
          });
        }
      );
    });
  };

  // Function to fetch and update the user's city based on geolocation
  const detectCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Use the Google Maps Geocoding API to determine the city
        const detectedCity = await determineCityByCoordinates(
          latitude,
          longitude
        );

        setCity(detectedCity);
      });
    }
  };

  // Function to determine the city based on coordinates using Google Maps Geocoding API
  const determineCityByCoordinates = async (latitude, longitude) => {
    try {
      const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      const data = await response.json();

      // Extract the city from the geocoding results (you may need to adjust this based on the API response)
      const cityResult = data.results.find((result) => {
        return result.types.includes("locality");
      });

      if (cityResult) {
        return cityResult.formatted_address;
      } else {
        return "Unknown City";
      }
    } catch (error) {
      console.error("Error determining city:", error);
      return "Unknown City";
    }
  };

  useEffect(() => {
    // Auto-detect the user's city on component load
    detectCity();
  }, []);
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Add Property</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Add your property to ease.rentals"
            className="border p-3 rounded-lg"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            placeholder="Description-(eg: sq.feet area, nearby prime spots, distance from near by railway, Muslims not allowed)"
            className="border p-3 rounded-lg"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Addres, Area, Road, Landmark"
            className="border p-3 rounded-lg"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="border p-3 rounded-lg"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="carparking" className="w-5" />
              <span>Car Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="garden" className="w-5" />
              <span>Garden</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="clubhouse" className="w-5" />
              <span>Club House</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="pool" className="w-5" />
              <span>Swimming Pool</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="temple" className="w-5" />
              <span>Temple</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bed Room</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="washroom"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Washroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedprice"
                min="1"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:-
            <span className="font-normal text-gray-500 ml-2">
              Images of property eg: rooms, locality max.6
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images1"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-800 border border-green-800 rounded uppercase hover:shadow-lg disabled:opacity-70"
            >
              {uploading ? "Uplloading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 border item-center"
                key={url}
              >
                {" "}
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700rounded-lg uppercase hover:opacity-65"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-gray-700 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-70">
            LIST PROPERTY
          </button>
        </div>
      </form>
    </main>
  );
}
