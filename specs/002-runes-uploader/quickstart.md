# Quickstart: Runes Uploader

This quickstart guide outlines the steps to upload rune data using the new uploader feature.

## Prerequisites
- Access to the rune uploader service endpoint.
- A valid JSON file containing rune data, conforming to the `RunePath` and `Rune` schema defined in `rune-uploader.yaml`.

## Step-by-step Guide

1. **Prepare your JSON data**
   Ensure your `runesReforged.json` file is correctly formatted. An example structure is provided below:

   ```json
   [
     {
       "id": 8100,
       "key": "Domination",
       "icon": "perk-images/Styles/7200_Domination.png",
       "name": "Domination",
       "slots": [
         {
           "runes": [
             {
               "id": 8112,
               "key": "Electrocute",
               "icon": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
               "name": "Electrocute",
               "shortDesc": "...",
               "longDesc": "..."
             }
           ]
         }
       ]
     }
   ]
   ```

2. **Upload the JSON file**
   Use a tool like `curl` or a similar HTTP client to send a POST request to the `/runes/upload` endpoint.

   ```bash
   curl -X POST \
     -H "Content-Type: application/json" \
     --data-binary "@/path/to/your/runesReforged.json" \
     http://your-service-endpoint/runes/upload
   ```

   Replace `/path/to/your/runesReforged.json` with the actual path to your file and `http://your-service-endpoint` with the correct address of the rune uploader service.

3. **Verify the upload (Expected Outcome)**
   - A successful upload will return a `200 OK` response.
   - If the JSON is invalid or there's an issue with data processing, a `400 Bad Request` or `500 Internal Server Error` will be returned with a descriptive error message.

## Acceptance Scenario

**Given** a valid `runesReforged.json` file
**When** the file is uploaded to the `/runes/upload` endpoint
**Then** the system should respond with `200 OK` and the rune data should be successfully loaded into the ClickHouse database.
