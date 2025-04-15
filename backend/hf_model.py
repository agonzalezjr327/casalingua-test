from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

class HFModel:
    def __init__(self, model_id="t5-base", max_tokens=512):
        print(f"Loading model: {model_id}")
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_id)  # Use AutoModelForSeq2SeqLM for T5
        self.generator = pipeline(
            "text2text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            return_full_text=False
        )
        self.max_tokens = max_tokens

    def generate(self, prompt: str) -> str:
        # Adding a clear instruction to simplify the legal text
        prompt_with_instruction = f"simplify: {prompt}"
        results = self.generator(prompt_with_instruction, max_new_tokens=self.max_tokens)
        return results[0]["generated_text"].strip()

# Usage
legal_text = "The party of the first part hereby agrees to indemnify and hold harmless the party of the second part in any circumstance in which they may be held liable for damages..."
model = HFModel(model_id="t5-base")  # Use T5 instead of distilgpt2
simplified_text = model.generate(legal_text)
print(simplified_text)
