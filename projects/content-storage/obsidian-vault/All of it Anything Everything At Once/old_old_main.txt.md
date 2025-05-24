
# old old main.txt
import abc
import os
import openai
import yaml
import sys

from dotenv import load_dotenv
load_dotenv()

# Load environment variables from .env file

from abstract_singleton import AbstractSingleton

class Config(AbstractSingleton):
	def __init__(self):
		super().__init__()
		self.openai_api_key = os.getenv("OPENAI_API_KEY", None)
		self.temperature = float(os.getenv("TEMPERATURE", 0.5))
		self.memory_index = os.getenv("MEMORY_INDEX", 'auto-gpt')
		self.memory_backend = os.getenv("MEMORY_BACKEND", 'local')
		self.redis_host = os.getenv("REDIS_HOST", 'localhost')
		self.redis_port = os.getenv("REDIS_PORT", "6379")
		self.redis_password = os.getenv("REDIS_PASSWORD")
		self.redis_db = os.getenv("REDIS_DB", '0')
		print(f"REDIS DB: {self.redis_db}")
		self.smart_api_key = os.getenv("SMART_API_KEY")
		self.smart_llm_model = os.getenv("SMART_LLM_MODEL")
		self.google_api_key = os.getenv("GOOGLE_API_KEY")
		self.google_cse_id = os.getenv("GOOGLE_CSE_ID")
		self.user_agent_header = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}

	@staticmethod
	def construct_full_prompt():
		prompt = "Some prompt text"
		# add more text to the prompt based on configuration options...
		return prompt
	
		# Initialize the OpenAI API client
		openai.api_key = self.openai_api_key

		# Set the number of requests per minute for the OpenAI API
		openai.api_requestor.requests_per_minute = int(os.getenv('OPENAI_REQUESTS_PER_MINUTE', '120'))

	def set_openai_api_key(self, value: str):
		"""Set the OpenAI API key."""
		self.openai_api_key = value
		openai.api_key = value

		self.google_api_key = os.getenv("GOOGLE_API_KEY")
		self.redis_host = os.getenv("REDIS_HOST", "localhost")
		self.redis_port = int(os.getenv("REDIS_PORT", 6379))
		self.redis_password = os.getenv("REDIS_PASSWORD", None)
		self.memory_backend = os.getenv("MEMORY_BACKEND", "local")
		self.memory_index = os.getenv("MEMORY_INDEX", "auto-gpt")
		self.memory_key_separator = os.getenv("MEMORY_KEY_SEPARATOR", "::")
		self.max_history_length = int(os.getenv("MAX_HISTORY_LENGTH", 3))
		self.max_response_length = int(os.getenv("MAX_RESPONSE_LENGTH", 256))
		self.smart_llm_model = os.getenv("SMART_LLM_MODEL", None)
		self.user_agent_header = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}

	def set_user_agent_header(self, value: str):
		"""Set the User-Agent header to use in API requests."""
		self.user_agent_header = {"User-Agent": value}

	def set_redis_host(self, value: str):
		"""Set the Redis server host."""
		self.redis_host = value

	def set_redis_port(self, value: int):
		"""Set the Redis server port."""
		self.redis_port = value

	def set_redis_db(self, value: int):
		"""Set the Redis database to use."""
		self.redis_db = value

	def set_memory_index(self, value: str):
		"""Set the Redis memory index."""
		self.memory_index = value

	def set_memory_backend(self, value: str):
		"""Set the memory backend."""
		self.memory_backend = value

	def set_openai_requests_per_minute(self, value: int):
		"""Set the number of requests per minute for the OpenAI API."""
		print(f"MEMORY BACKEND: {self.memory_backend}")
		openai.api_requestor.requests_per_minute = value

	def get_openai_api_key(self) -> str:
		"""Get the OpenAI API key."""
		return self.openai_api_key

	def get_user_agent_header(self) -> str:
		"""Get the User-Agent header."""
		return self.user_agent_header

	def get_redis_host(self) -> str:
		"""Get the Redis server host."""
		return self.redis_host

	def get_redis_port(self) -> int:
		"""Get the Redis server port."""
		return self.redis_port

	def get_redis_db(self) -> int:
		"""Get the Redis database."""
		return self.redis_db

	def get_memory_index(self) -> str:
		"""Get the Redis memory index."""
		return self.memory_index

	def get_memory_backend(self) -> str:
		"""Get the memory backend."""
		return self
	
	def get_azure_deployment_id_for_model(self, model: str) -> str:
		"""
		Get the Azure deployment ID for the given model.

		:param model: Name of the model.
		:return: Azure deployment ID.
		"""
		if model not in self.azure_deployment_ids:
			raise ValueError(f"Model {model} not found in azure_deployment_ids.")

		return self.azure_deployment_ids[model]

	def set_google_api_key(self, value: str):
		"""
		Set the Google API key.

		:param value: Google API key.
		"""
		self.google_api_key = value

		self.use_mac_os_tts = True
		self.use_mac_os_tts = os.getenv("USE_MAC_OS_TTS")

		self.google_api_key = os.getenv("GOOGLE_API_KEY")
		self.custom_search_engine_id = os.getenv("CUSTOM_SEARCH_ENGINE_ID")

		self.pinecone_api_key = os.getenv("3b0a61d7-f207-4c53-96db-d93794c4270c")
		self.pinecone_region = os.getenv("PINECONE_API_KEY")

		self.image_provider = os.getenv("IMAGE_PROVIDER")
		self.huggingface_api_token = os.getenv("HUGGINGFACE_API_TOKEN")

		# User agent headers to use when browsing web
		# Some websites might just completely deny request with an error code if no user agent was found.
		self.user_agent_header = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
		self.redis_host = os.getenv("REDIS_HOST", "localhost")
		self.redis
		self.user_agent_header = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
		self.redis_host = os.getenv("REDIS_HOST", "localhost")
		self.redis_port = os.getenv("REDIS_PORT", "6379")
		self.redis_password = os.getenv("REDIS_PASSWORD", "")
		self.wipe_redis_on_start = os.getenv("WIPE_REDIS_ON_START", "True") == 'True'
		self.memory_index = os.getenv("MEMORY_INDEX", 'auto-gpt')
	# Note that indexes must be created on db 0 in redis, this is not configurable.

		self.memory_backend = os.getenv("MEMORY_BACKEND", 'local')
		# Initialize the OpenAI API client
		openai.api_key = self.openai_api_key

	# Set the number of requests per minute for the OpenAI API
	openai.api_requestor.requests_per_minute = int(os.getenv('OPENAI_REQUESTS_PER_MINUTE', '120'))

	# Set the backend for the LLM
	os.environ["LARGE_LM_BACKEND"] = os.getenv("LARGE_LM_BACKEND", "gpt")
	# Set the number of workers for the LLM
	os.environ["LARGE_LM_NUM_WORKERS"] = os.getenv("LARGE_LM_NUM_WORKERS", "1")

	# Set the path for the LLM models
	os.environ["LARGE_LM_PATH"] = os.getenv("LARGE_LM_PATH", "llm-models")

	# Set the cache size for the LLM
	os.environ["LARGE_LM_CACHE_SIZE"] = os.getenv("LARGE_LM_CACHE_SIZE", "2000")

	# Set the maximum length for the LLM
	os.environ["LARGE_LM_MAX_LEN"] = os.getenv("LARGE_LM_MAX_LEN", "2048")

	# Set the number of retries for HTTP requests
	os.environ["HTTP_RETRY_COUNT"] = os.getenv("HTTP_RETRY_COUNT", "3")

	# Set the backoff factor for HTTP retries
	os.environ["HTTP_RETRY_BACKOFF_FACTOR"] = os.getenv("HTTP_RETRY_BACKOFF_FACTOR", "0.5")

	# Set the maximum number of retries for HTTP requests
	os.environ["HTTP_RETRY_MAX_RETRIES"] = os.getenv("HTTP_RETRY_MAX_RETRIES", "5")

	# Set the timeout for HTTP requests
	os.environ["HTTP_REQUEST_TIMEOUT"] = os.getenv("HTTP_REQUEST_TIMEOUT", "10")

	# Set the timeout for HTTP connections
	os.environ["HTTP_CONNECTION_TIMEOUT"] = os.getenv("HTTP_CONNECTION_TIMEOUT", "10")

	# Set the retry status codes for HTTP retries
	os.environ["HTTP_RETRY_STATUS_CODES"] = os.getenv("HTTP_RETRY_STATUS_CODES", "500,502,503,504,522,524,408")

	# Set the logging level
	os.environ["LOG_LEVEL"] = os.getenv("LOG_LEVEL", "INFO")

	# Set the logging format
	os.environ["LOG_FORMAT"] = os.getenv("LOG_FORMAT", "%(asctime)s - %(levelname)s - %(name)s - %(message)s")

	def update_from_env(self):
		"""
		Updates the configuration from environment variables.
		"""
		self.debug_mode = os.getenv("DEBUG_MODE", "False") == 'True'
		self.continuous_mode = os.getenv("CONTINUOUS_MODE", "False") == 'True'
		self.continuous_limit = int(os.getenv("CONTINUOUS_LIMIT", "0"))
		self.memory_backend = os.getenv("MEMORY_BACKEND", 'local')
		
		def __init__(self):
			"""Initialize the Config class"""
		self.debug_mode = False
		self.continuous_mode = False
		self.continuous_limit = 0
		self.speak_mode = False

		self.fast_llm_model = os.getenv("FAST_LLM_MODEL", "gpt-3.5-turbo")
		self.smart_llm_model = os.getenv("SMART_LLM_MODEL", "gpt-4")
		self.fast_token_limit = int(os.getenv("FAST_TOKEN_LIMIT", 4000))
		self.smart_token_limit = int(os.getenv("SMART_TOKEN_LIMIT", 8000))

	#print(self.openai_api_key)
	
		self.openai_api_key = os.getenv("OPEN_API_KEY")
		self.temperature = float(os.getenv("TEMPERATURE", "1"))
		self.use_azure = os.getenv("USE_AZURE") == 'True'
		self.execute_local_commands = os.getenv('EXECUTE_LOCAL_COMMANDS', 'False') == 'True'

		if self.use_azure:
			self.load_azure_config()
			openai.api_type = self.openai_api_type
			openai.api_base = self.openai_api_base
			openai.api_version = self.openai_api_version

	def set_elevenlabs_api_key(self, value: str):
			"""Set the ElevenLabs API key value."""
			self.elevenlabs_api_key = value

	def set_elevenlabs_voice_1_id(self, value: str):
			"""Set the ElevenLabs Voice 1 ID value."""
			self.set_elevenlabs_voice_1_id = value

			self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
			self.elevenlabs_voice_2_id = os.getenv("ELEVENLABS_VOICE_2_ID")

			self.use_mac_os_tts = False
			use_mac_os_tts = os.getenv("USE_MAC_OS_TTS")
			if use_mac_os_tts is not None:
				self.use_mac_os_tts = use_mac_os_tts.lower() == "true"

			self.google_api_key = os.getenv("GOOGLE_API_KEY")
			self.custom_search_engine_id = os.getenv("CUSTOM_SEARCH_ENGINE_ID")

			self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
			self.pinecone_region = os.getenv("PINECONE_REGION")

			self.image_provider = os.getenv("IMAGE_PROVIDER")
			self.huggingface_api_token = os.getenv("HUGGINGFACE_API_TOKEN")

			# User agent headers to use when browsing web
			# Some websites might just completely deny request with an error code if no user agent was found.
			self.user_agent_header = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
			self.redis_host = os.getenv("REDIS_HOST", "localhost")
			self.redis_port = os.getenv("REDIS_PORT", "6379")
			self.redis_password = os.getenv("REDIS_PASSWORD", "")
			self.wipe_redis_on_start = os.getenv("WIPE_REDIS_ON_START", "True") == 'True'
			self.memory_index = os.getenv("MEMORY_INDEX", 'auto-g')
			self.memory_backend = os.getenv("MEMORY_BACKEND", 'local')
			# Initialize the OpenAI API client
			openai.api_key = self.openai_api_key

config = Config()
