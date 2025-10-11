from tensorflow.keras.models import load_model

model = load_model("C:/PRK/FarmChainX/farmchainx-frontend/fruit_classification/model.h5")
print(model.summary())
