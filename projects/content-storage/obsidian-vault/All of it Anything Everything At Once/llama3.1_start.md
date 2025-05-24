
# llama3.1 start
python3 -m venv llama-test-env
source llama-test-env/bin/activate
pip install torch transformers sentencepiece
python ~/Repository/llama-models/models/llama3_1/llama.py --model instruct

