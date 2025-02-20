// Load high-resolution satellite imagery
var image = ee.ImageCollection("USDA/NAIP/DOQQ")
             .filterDate('2022-01-01', '2023-12-31')
             .median();

// Create an empty feature collection to store user-drawn polygons
var drawnPolygons = ee.FeatureCollection([]);

// UI Panel for instructions and input
var panel = ui.Panel({
    widgets: [
        ui.Label('📌 Instructions:', {fontWeight: 'bold'}),
        ui.Label('1. Enter latitude & longitude coordinates.'),
        ui.Label('2. Click "Go to Location" to move the map.'),
        ui.Label('3. Click "Draw Polygon" and select points to draw a boundary.'),
        ui.Label('4. Click "Erase Last" to remove mistakes.'),
        ui.Label('5. Click "Compute Area" to calculate details.')
    ],
    style: {position: 'top-left', width: '300px'}
});

// Text input fields for coordinates
var latInput = ui.Textbox({placeholder: 'Enter Latitude'});
var lonInput = ui.Textbox({placeholder: 'Enter Longitude'});

// Button to go to input coordinates
var goToLocationButton = ui.Button({
    label: 'Go to Location',
    onClick: function() {
        var lat = parseFloat(latInput.getValue());
        var lon = parseFloat(lonInput.getValue());

        if (!isNaN(lat) && !isNaN(lon)) {
            var point = ee.Geometry.Point([lon, lat]);
            Map.centerObject(point, 19);
            Map.addLayer(image, {bands: ['R', 'G', 'B'], min: 0, max: 255}, 'Satellite Image');
        } else {
            print('⚠️ Please enter valid latitude and longitude values.');
        }
    }
});

// Create a drawing tool
var drawingTool = Map.drawingTools();
drawingTool.setShape('polygon');  // Allow only polygon drawing
drawingTool.onDraw(function(geometry) {
    drawnPolygons = drawnPolygons.merge(ee.FeatureCollection([ee.Feature(geometry)]));
});

// Function to compute area & perimeter
function computeArea() {
    if (drawnPolygons.size().getInfo() === 0) {
        resultPanel.clear();
        resultPanel.add(ui.Label({
            value: "⚠️ No polygon drawn. Please draw a polygon first.",
            style: {color: 'red', fontSize: '14px'}
        }));
        return;
    }

    var mergedGeometry = drawnPolygons.union().geometry();
    
    var areaSqMeters = mergedGeometry.area().round();  // Area in square meters
    var perimeterMeters = mergedGeometry.perimeter().round();  // Perimeter in meters

    // Clear previous results
    resultPanel.clear();

    // Display results in UI
    resultPanel.add(ui.Label({
        value: '✅ Parking Lot Area: ' + areaSqMeters.getInfo() + ' m²',
        style: {color: 'green', fontSize: '14px'}
    }));
    
    resultPanel.add(ui.Label({
        value: '📏 Perimeter: ' + perimeterMeters.getInfo() + ' m',
        style: {color: 'blue', fontSize: '14px'}
    }));
}

// Function to erase the last drawn polygon
function eraseLast() {
    drawnPolygons = ee.FeatureCollection([]); // Reset collection
    Map.layers().reset(); // Clear map layers
    Map.addLayer(image, {bands: ['R', 'G', 'B'], min: 0, max: 255}, 'Satellite Image');
    
    // Clear results from UI
    resultPanel.clear();
}

// Buttons for drawing and erasing
var drawButton = ui.Button({
    label: 'Draw Polygon',
    onClick: function() {
        drawingTool.draw();
    }
});

var eraseButton = ui.Button({
    label: 'Erase Last',
    onClick: eraseLast
});

var computeButton = ui.Button({
    label: 'Compute Area',
    onClick: computeArea
});

// Create a panel to display results
var resultPanel = ui.Panel({
    style: {position: 'top-right', width: '250px', padding: '8px'}
});

// Add UI elements to panel
panel.add(latInput);
panel.add(lonInput);
panel.add(goToLocationButton);
panel.add(drawButton);
panel.add(eraseButton);
panel.add(computeButton);

// Add panel to the UI
Map.add(panel);
Map.add(resultPanel);

// Set default map location (optional)
Map.centerObject(ee.Geometry.Point([-94.67144195540412, 38.85767473217091]), 19);
Map.addLayer(image, {bands: ['R', 'G', 'B'], min: 0, max: 255}, 'Satellite Image');
