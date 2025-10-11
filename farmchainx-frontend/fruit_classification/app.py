from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from io import BytesIO

# Load trained model once at startup
model = load_model("fruit_classification/model.h5")

app = FastAPI()

# Allow requests from all origins (frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Only accept image files
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        return {"error": "File must be an image (.png, .jpg, .jpeg)"}

    try:
        # Read image
        contents = await file.read()
        img = Image.open(BytesIO(contents)).convert("RGB")
        img = img.resize((224, 224))  # match your model input size
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

        # Predict
        prediction = model.predict(img_array)[0][0]

        # Convert prediction to label and confidence
        if prediction < 0.5:
            label = "Fresh Fruit"
            confidence = 1.0 - prediction
        else:
            label = "Rotten Fruit"
            confidence = prediction

        return {"label": label, "confidence": round(float(confidence) * 100, 2)}

    except Exception as e:
        return {"error": str(e)}
