from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
)

app = Flask(__name__)
CORS(app)

fine_tuned_model = AutoModelForCausalLM.from_pretrained("./chatbot_model")
fine_tuned_tokenizer = AutoTokenizer.from_pretrained("./chatbot_model")
fine_tuned_tokenizer.pad_token = fine_tuned_tokenizer.eos_token


@app.route("/send", methods=["POST"])
def send_input():
    user_input = request.get_json()

    if not user_input or "message" not in user_input:
        return jsonify({"error": "No input provided."}), 400

    user_message = user_input["message"]
    print(f"Receive input: {user_message}")

    # Encode with attention_mask
    encoded_input = fine_tuned_tokenizer.encode_plus(
        "User: " + user_message + "\nBot:",
        return_tensors="pt",
        padding=True,  # Ensure padding is handled if you were to batch inputs
        truncation=True,  # Truncate if input is too long for the model
    )

    input_ids = encoded_input.input_ids
    attention_mask = encoded_input.attention_mask  # Extract attention mask

    response_ids = fine_tuned_model.generate(
        input_ids,
        attention_mask=attention_mask,  # Pass the attention mask
        max_length=100,
        pad_token_id=fine_tuned_tokenizer.eos_token_id,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.9,
        temperature=0.7,
    )

    bot_response = fine_tuned_tokenizer.decode(
        response_ids[:, input_ids.shape[-1] :][0], skip_special_tokens=True
    )

    print(f"Sending response: {bot_response}")
    return jsonify({"response": bot_response})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
