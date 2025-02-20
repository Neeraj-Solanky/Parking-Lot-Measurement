# 🚗 Parking Lot Area Measurement Tool

This project is a **Google Earth Engine (GEE) application** that allows users to measure the **area and perimeter** of parking lots using high-resolution satellite imagery. Users can manually draw parking lot boundaries, erase mistakes, and compute accurate measurements. The tool dynamically loads satellite images based on user-inputted coordinates and date filters, ensuring precise and up-to-date results.

## 🌍 Features

- 📍 **Input GPS Coordinates**: Users can enter latitude and longitude to locate a parking lot.
- 📅 **Date Filtering**: Allows users to select a date range for high-resolution satellite imagery.
- ✏️ **Draw Polygon Manually**: Users can outline parking lots by selecting points on the map.
- ❌ **Erase & Redraw**: Option to remove mistakes and redraw boundaries.
- 📏 **Compute Area & Perimeter**: Calculates the parking lot's total area (in square meters) and perimeter (in meters).

## 🛠️ How to Use

1. **Open the Google Earth Engine Code Editor** ([code.earthengine.google.com](https://code.earthengine.google.com/)).
2. Copy and paste the script into the editor.
3. Enter the **latitude & longitude** of the parking lot.
4. Select a **date range** to filter satellite imagery.
5. Click "Draw Polygon" to outline the parking lot.
6. If needed, use "Erase Last" to remove mistakes.
7. Click "Compute Area" to get parking lot measurements.

## 📂 Project Structure

```
├── parking_lot_area.js  # Main Google Earth Engine script
└── README.md            # Project documentation (this file)
```

## 📸 Example Output

- **Perimeter:** 1,464.67 meters  
- **Area:** 33,971.93 square meters  

(Screenshot Example: Add image here)

## 🔗 Project Link

You can access the project on GitHub: [GitHub Repository](https://github.com/Neeraj-Solanky/Parking-Lot-Measurement)
You can access the deployed version of the project here: https://ee-goalkeeperji1.projects.earthengine.app/view/parkmetric

## 🏗️ Future Improvements

- Add **automatic polygon detection** for parking lots using ML.
- Implement **export options** for calculated data (CSV, GeoJSON, etc.).
- Improve UI for a better user experience.

## 📝 License

This project is open-source under the **MIT License**.

---

👨‍💻 Developed by **Neeraj Solanky** 🚀

