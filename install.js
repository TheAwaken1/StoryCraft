module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/TheAwaken1/StoryCraft-AI.git app",
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
          // triton: true   // uncomment this line if your project requires triton
          // sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
    // Pip upgrade
    {
      "method": "shell.run",
      "params": {
          "venv": "env",
          "path": "app",
          "message": "python.exe -m pip install --upgrade pip"
      }
    },
    // Edit this step with your custom install commands
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "env": {
          "COQUI_TTS_AGREE_LICENSE": "1",
          "CMAKE_ARGS": "-DGGML_CUDA=on" // CMAKE_ARGS set here
        },
        "message": "pip install coqui-tts==0.25.3 --no-cache-dir --use-pep517"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install bitsandbytes>=0.43.0"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
            "python -c \"import nltk, os; nltk_data_path = os.path.join(os.getcwd(), 'nltk_data'); os.makedirs(nltk_data_path, exist_ok=True); nltk.data.path.append(nltk_data_path); nltk.download('punkt', download_dir=nltk_data_path, quiet=True); print('NLTK punkt downloaded to', nltk_data_path)\""
        ],  
      }
    },
  ]
}
