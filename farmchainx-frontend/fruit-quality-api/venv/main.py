from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
import io
import random

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all. Later, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Fruit Quality API is running 🚀"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Convert file to image (you can connect ML model here)
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    # Dummy AI predictor (replace with real CV model later)
    labels = ["Fresh", "Stale", "Overripe", "Spoiled"]
    prediction = random.choice(labels)

    return {"prediction": prediction}
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
