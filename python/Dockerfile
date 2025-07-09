FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt ./
RUN --mount=type=cache,target=/root/.cache/pip pip install --no-cache-dir \
    -r requirements.txt \
    --extra-index-url https://download.pytorch.org/whl/cpu

COPY modelresponse.py ./

COPY chatbot_model/config.json ./chatbot_model/
COPY chatbot_model/generation_config.json ./chatbot_model/
COPY chatbot_model/merges.txt ./chatbot_model/
COPY chatbot_model/model.safetensors ./chatbot_model/
COPY chatbot_model/special_tokens_map.json ./chatbot_model/
COPY chatbot_model/tokenizer_config.json ./chatbot_model/
COPY chatbot_model/tokenizer.json ./chatbot_model/
COPY chatbot_model/vocab.json ./chatbot_model/

EXPOSE 5000

CMD ["python", "modelresponse.py"]